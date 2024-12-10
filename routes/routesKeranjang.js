// routes/routesKeranjang.js
const express = require('express');
const router = express.Router();
const keranjangControllers = require('../controllers/keranjangControllers');

// Tambah keranjang
router.post('/keranjang', keranjangControllers.addKeranjang);

// Lihat keranjang
router.get('/keranjang/:pelanggan_id', keranjangControllers.lihatKeranjang);

// Hapus keranjang
router.delete('/keranjang/:keranjang_id', keranjangControllers.hapusKeranjang);

// Update total harga keranjang
router.post('/keranjang/:keranjang_id', keranjangControllers.updateKeranjangJumlahHarga);


module.exports = router;
