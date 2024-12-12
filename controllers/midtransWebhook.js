// controllers/midtransWebhook.js
const Pembayaran = require('../models/Pembayaran');
const midtransClient = require('midtrans-client');
const crypto = require('crypto');
const { MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY } = require('../constants/midtrans');

const handleMidtransWebhook = async (req, res) => {
    try {
        const notification = req.body;
        console.log('Received Midtrans Webhook:', JSON.stringify(notification, null, 2));

        // Verifikasi notifikasi menggunakan Midtrans SDK
        const apiClient = new midtransClient.CoreApi({
            isProduction: false,
            serverKey: MIDTRANS_SERVER_KEY,
            clientKey: MIDTRANS_CLIENT_KEY,
        });

        // Verifikasi signature key
        const { order_id, status_code, gross_amount, signature_key } = notification;

        const serverKey = MIDTRANS_SERVER_KEY;
        const generatedSignature = crypto
            .createHash('sha512')
            .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
            .digest('hex');

        if (generatedSignature !== signature_key) {
            console.error('Invalid Midtrans Webhook Signature');
            return res.status(400).send('Invalid signature');
        }

        // Ambil response dari Midtrans
        const response = await apiClient.transaction.notification(notification);
        const { transaction_status } = response;

        // Mapping status pembayaran yang lebih komprehensif
        const statusMapping = {
            'settlement': 'success',
            'capture': 'success',
            'pending': 'pending',
            'deny': 'failed',
            'expire': 'expired',
            'cancel': 'cancelled'
        };

        // Ekstrak ID pembayaran dari order_id
        const checkout_id = order_id.startsWith('ORDER-') ? order_id.split('ORDER-')[1] : order_id;

        // Cari pembayaran berdasarkan checkout_id
        const pembayaran = await Pembayaran.findOne({
            where: {
                checkout_id: checkout_id
            }
        });

        if (!pembayaran) {
            console.error('Pembayaran tidak ditemukan untuk order_id:', order_id);
            console.error('Extracted checkout_id:', checkout_id);
            return res.status(404).send('Pembayaran tidak ditemukan');
        }

        // Update status pembayaran
        pembayaran.pembayaran_status = statusMapping[transaction_status] || transaction_status;
        pembayaran.pembayaran_waktu = new Date();

        // Simpan perubahan dengan penanganan error
        try {
            await pembayaran.save();
            console.log(`Pembayaran untuk Checkout ID ${checkout_id} berhasil diupdate:`, {
                status: pembayaran.pembayaran_status
            });
        } catch (saveError) {
            console.error('Gagal menyimpan perubahan status pembayaran:', saveError);
            return res.status(500).send('Gagal menyimpan status pembayaran');
        }

        // Kirim respons sukses
        res.status(200).send('Webhook processed successfully');
    } catch (error) {
        console.error('Error handling Midtrans webhook:', error);

        // Log detail error untuk debugging
        if (error.response) {
            console.error('Midtrans Response Error:', error.response.data);
        }

        res.status(500).send('Internal server error during webhook processing');
    }
};

module.exports = handleMidtransWebhook;
