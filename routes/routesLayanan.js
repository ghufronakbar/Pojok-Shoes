const express = require('express');
const { getAllLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan, getLayananByKategori, getLayananCheck, editPictureLayanan } = require('../controllers/layananControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const uploadCloudinary = require('../helpers/cloudinary/uploadCloudinary');

// Mendapatkan semua layanan
router.get('/all', getAllLayanan);
router.get('/check', getLayananCheck);



router.post('/layanan/:id/picture', uploadCloudinary("layanan").single("picture"), editPictureLayanan);
// Mendapatkan layanan berdasarkan grup Kategori
router.get('/layanan/:kategori', getLayananByKategori);  // ID 1-3

router.post('/layanan', authenticateToken, createLayanan);

router.put('/layanan/:id', authenticateToken, updateLayanan);

router.delete('/layanan/:id', authenticateToken, deleteLayanan);

module.exports = router;
