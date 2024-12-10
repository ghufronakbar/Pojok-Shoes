const express = require('express');
const router = express.Router();
const detailKeranjangController = require('../controllers/detailkeranjangControllers');

// Tambah detail ke keranjang
router.post('/detail', detailKeranjangController.addDetailKeranjang);

// Lihat detail keranjang berdasarkan `keranjang_id`
router.get('/detail/:keranjang_id', detailKeranjangController.viewDetailKeranjang);
router.get('/detail/:keranjang_id/detail', detailKeranjangController.viewDetailKeranjang);

// Hapus detail dari keranjang berdasarkan `detail_id`
router.delete('/detail/:detail_id', detailKeranjangController.deleteDetailKeranjang);

module.exports = router;
