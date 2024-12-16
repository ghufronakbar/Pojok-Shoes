const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperControllers');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/ongkir', authenticateToken, helperController.calcShippingCost);

module.exports = router;
