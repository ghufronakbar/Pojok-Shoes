const express = require('express');
const { register, login, updateProfile, getProfile } = require('../controllers/pelangganControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticateToken, updateProfile);
router.get('/profile', authenticateToken, getProfile);

module.exports = router;