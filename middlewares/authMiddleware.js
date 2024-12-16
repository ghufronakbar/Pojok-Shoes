const jwt = require('jsonwebtoken');
const Pelanggan = require('../models/Pelanggan');
const { SECRET_KEY } = require('../constants');

const authMiddleware = async (req, res, next) => {
  // Log header Authorization untuk debugging
  // console.log('Authorization Header:', req.header('Authorization'));

  const token = req.header('Authorization')?.replace('Bearer ', ''); // Mengambil token
  // console.log('Extracted Token:', token); // Log token yang diekstrak

  if (!token) {
    // console.log('No token provided'); // Log tambahan
    return res.status(401).json({ error: 'No token provided' }); // Token tidak ada
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log('Decoded Token:', decoded); // Log token yang sudah didecode

    // Cari pelanggan berdasarkan pelanggan_id
    const pelanggan = await Pelanggan.findByPk(decoded.id);
    // console.log('Found Pelanggan:', pelanggan); // Log pelanggan yang ditemukan

    if (!pelanggan) {
      // console.log('Pelanggan not found for ID:', decoded.id); // Log tambahan
      return res.status(404).json({ error: 'Pelanggan not found' }); // Jika pelanggan tidak ditemukan
    }

    // Simpan informasi pelanggan di request
    req.user = pelanggan;
    req.pelanggan = pelanggan; // Tetap gunakan req.pelanggan untuk kompatibilitas

    next(); // Lanjutkan ke route handler berikutnya
  } catch (error) {
    // Log detail error untuk debugging
    console.error('Authentication Error Details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    // Perbaikan untuk menangani error spesifik
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Error umum
    res.status(401).json({
      error: 'Not authorized to access this resource',
      details: error.message
    });
  }
};

module.exports = authMiddleware;