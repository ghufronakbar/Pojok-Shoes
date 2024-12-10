const express = require('express');
const { buatPembayaran } = require('../controllers/pembayaranControllers'); // Sesuaikan nama file dengan huruf kapital yang benar
const router = express.Router();

// Route untuk membuat pembayaran
router.post('/pembayaran', async (req, res) => {
    const { checkout_id, jumlahbayar } = req.body;

    if (!checkout_id || !jumlahbayar) {
        return res.status(400).json({ message: 'Checkout ID dan Jumlah Bayar harus ada' });
    }

    try {
        const snapResponse = await buatPembayaran(checkout_id, jumlahbayar);
        return res.status(200).json({
            message: 'Pembayaran berhasil dibuat',
            snaptoken: snapResponse.token, // Kembalikan token untuk digunakan di frontend
            redirect_url: snapResponse.redirect_url, // URL untuk redirect pembayaran
        });
    } catch (error) {
        console.error('Error saat membuat pembayaran:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat membuat pembayaran', error: error.message });
    }
});

module.exports = router;
