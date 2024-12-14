const express = require('express');
const { register, login, updateProfile, getProfile, updatePassword, postPicture, deletePicture, } = require('../controllers/pelangganControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const uploadCloudinary = require('../helpers/cloudinary/uploadCloudinary');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticateToken, updateProfile);
router.patch('/profile', authenticateToken, updatePassword);
router.get('/profile', authenticateToken, getProfile);
router.post('/picture', authenticateToken, uploadCloudinary("profile").single("picture"), postPicture);
router.delete('/picture', authenticateToken, deletePicture);

module.exports = router;