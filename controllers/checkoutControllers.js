const Checkout = require('../models/Checkout');
const Keranjang = require('../models/Keranjang');
const Pembayaran = require('../models/Pembayaran')
const midtransClient = require('midtrans-client');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/pojokShoes');
const { MIDTRANS_SERVER_KEY } = require('../constants');


const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
});

exports.createCheckout = async (req, res) => {
    const t = await sequelize.transaction(); // Start a transaction

    try {
        const { keranjang_id } = req.body;

        // Cek apakah keranjang tersedia
        const keranjang = await Keranjang.findOne({
            where: {
                keranjang_id,
                keranjang_status: '1', // Pastikan keranjang aktif
            },
            transaction: t
        });

        if (!keranjang) {
            await t.rollback();
            return res.status(404).json({ error: 'Keranjang tidak ditemukan atau sudah diproses' });
        }

        // Buat data checkout
        const checkout = await Checkout.create({
            keranjang_id,
            checkout_waktu: new Date(),
            checkout_status: 'dipesan', // Status awal
        }, { transaction: t });

        // Pastikan checkout_id yang benar digunakan
        const checkoutId = checkout.checkout_id;

        // Update status keranjang menjadi tidak aktif
        keranjang.keranjang_status = '0';
        await keranjang.save({ transaction: t });

        // Buat parameter untuk Midtrans snapToken
        const parameter = {
            transaction_details: {
                order_id: `ORDER-${checkoutId}`,
                gross_amount: keranjang.keranjang_jumlah_harga, // Total harga dari keranjang
            },
            item_details: [], // Tambahkan detail item jika diperlukan
            customer_details: {
                email: req.body.email || 'customer@example.com', // Email pelanggan
                first_name: req.body.nama || 'Customer',
            },
        };

        // Generate snapToken menggunakan Midtrans
        const snapResponse = await snap.createTransaction(parameter);

        // Simpan data pembayaran ke tabel pembayaran
        const pembayaran = await Pembayaran.create({
            checkout_id: checkoutId, // Gunakan checkout_id, bukan checkout.id atau checkout.dataValues.id
            pembayaran_jumlahbayar: keranjang.keranjang_jumlah_harga,
            pembayaran_metode: 'Midtrans',
            pembayaran_status: 'pending', // Status awal pembayaran
            pembayaran_waktu: new Date(),
            snaptoken: snapResponse.token,
        }, { transaction: t });

        // Commit transaksi
        await t.commit();

        res.status(201).json({
            message: 'Checkout berhasil dibuat',
            checkout,
            snapToken: snapResponse.token, // Kembalikan snapToken ke response
        });
    } catch (error) {
        // Rollback transaksi jika terjadi kesalahan
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: 'Gagal membuat checkout', detail: error.message });
    }
};



// Melihat daftar checkout berdasarkan status
exports.getCheckoutByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const checkouts = await Checkout.findAll({
            where: { checkout_status: status },
        });

        res.status(200).json(checkouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data checkout' });
    }
};

// Update status checkout
exports.updateCheckoutStatus = async (req, res) => {
    try {
        const { checkout_id } = req.params;
        const { checkout_status } = req.body;

        const checkout = await Checkout.findByPk(checkout_id);

        if (!checkout) {
            return res.status(404).json({ error: 'Checkout tidak ditemukan' });
        }

        checkout.checkout_status = checkout_status;
        await checkout.save();

        res.status(200).json({
            message: 'Status checkout berhasil diperbarui',
            checkout,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memperbarui status checkout' });
    }
};
