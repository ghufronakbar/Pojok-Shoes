const express = require('express');
const router = express.Router();

// Import controller Midtrans Webhook
const midtransWebhook = require('../controllers/midtransWebhook');

// Endpoint untuk webhook Midtrans
router.post('/midtrans', midtransWebhook); // Sesuaikan dengan controller

module.exports = router;
