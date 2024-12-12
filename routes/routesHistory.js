const express = require('express');
const { getAllHistories } = require('../controllers/historyControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getAllHistories);

module.exports = router;