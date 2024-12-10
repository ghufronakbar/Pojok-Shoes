const express = require('express');
const router = express.Router();
const helperController = require('../controllers/helperControllers');

router.get('/ongkir', helperController.calcShippingCost);

module.exports = router;
