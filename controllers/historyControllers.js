const { Sequelize } = require('sequelize');
const sequelize = require('../config/pojokShoes');
const Keranjang = require('../models/Keranjang');
const Checkout = require('../models/Checkout');

const getAllHistories = async (req, res) => {
    try {
        const pelangganId = req.user.pelanggan_id;

        // Langkah pertama: ambil semua keranjang milik pelanggan
        const keranjangs = await Keranjang.findAll({
            where: { pelanggan_id: pelangganId, keranjang_status: "0" },
            attributes: ['keranjang_id', 'keranjang_jumlah_harga', 'keranjang_status']
        });

        // if (keranjangs.length === 0) {
        //     return res.status(404).json({ error: 'Tidak ada keranjang untuk pelanggan ini' });
        // }

        // Langkah kedua: iterasi setiap keranjang untuk ambil data checkout, detailkeranjang, dan layanan
        const response = [];

        for (let keranjang of keranjangs) {
            const keranjangId = keranjang.keranjang_id;

            // Ambil data checkout untuk keranjang ini
            const checkout = await Checkout.findOne({
                where: { keranjang_id: keranjangId },
                attributes: ['checkout_waktu', 'checkout_status']
            });

            // Ambil detail keranjang dan layanan terkait
            const detailItems = await sequelize.query(`
                SELECT 
                    dk.jumlah_sepatu,
                    dk.detail_status,
                    l.layanan_nama
                FROM 
                    DetailKeranjang dk
                LEFT JOIN 
                    Layanan l ON l.layanan_id = dk.layanan_id
                WHERE 
                    dk.keranjang_id = :keranjangId
            `, {
                replacements: { keranjangId },
                type: Sequelize.QueryTypes.SELECT
            });

            // Strukturkan data dalam format yang diinginkan
            response.push({
                keranjang_id: keranjang?.keranjang_id,
                checkout_waktu: checkout?.checkout_waktu,
                total: keranjang?.keranjang_jumlah_harga,
                checkout_status: checkout?.checkout_status,
                checkout_items: detailItems?.map(item => ({
                    nama_layanan: item?.layanan_nama,
                    jumlah_sepatu: item?.jumlah_sepatu,
                    status: item?.detail_status                    
                }))
            });
        }

        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Gagal mengambil data checkout' });
    }
};

module.exports = { getAllHistories };
