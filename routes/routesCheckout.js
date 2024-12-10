const express = require('express');
const router = express.Router();
const checkoutControllers = require('../controllers/checkoutControllers');

// Buat checkout baru
router.post('/checkout', checkoutControllers.createCheckout);

// Lihat checkout berdasarkan status
router.get('/checkout/status/:status', checkoutControllers.getCheckoutByStatus);

// Update status checkout
router.put('/checkout/:checkout_id', checkoutControllers.updateCheckoutStatus);

module.exports = router;
