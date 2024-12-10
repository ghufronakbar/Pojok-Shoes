const express = require('express');
const { getAllLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan, getLayananByKategori } = require('../controllers/layananControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Mendapatkan semua layanan
router.get('/layanan', getAllLayanan);

// Mendapatkan layanan berdasarkan ID
router.get('/layanan/:id', getLayananById);

// Mendapatkan layanan berdasarkan grup ID
router.get('/layanan/group-1', getLayananByKategori);  // ID 1-3
router.get('/layanan/group-2', getLayananByKategori);  // ID 4-6
router.get('/layanan/group-3', getLayananByKategori);  // ID 7-9
router.get('/layanan/group-4', getLayananByKategori);  // ID 10-12

router.post('/layanan', authenticateToken, createLayanan);

router.put('/layanan/:id', authenticateToken, updateLayanan);

router.delete('/layanan/:id', authenticateToken, deleteLayanan);

module.exports = router;
