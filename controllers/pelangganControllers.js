const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Pelanggan = require('../models/Pelanggan');
const { Sequelize } = require('sequelize');
const { SECRET_KEY } = require('../constants');


const register = async (req, res) => {
  const { pelanggan_nama, pelanggan_alamat, pelanggan_nomor, pelanggan_password, pelanggan_email } = req.body;

  try {
    // Check if phone number or email already exists
    const existingPelanggan = await Pelanggan.findOne({
      where: {
        [Sequelize.Op.or]: [
          { pelanggan_nomor },
          { pelanggan_email }
        ]
      }
    });

    if (existingPelanggan) {
      return res.status(400).json({ message: 'Nomor telepon atau email sudah terdaftar' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(pelanggan_password, 10);

    // Create new pelanggan
    const newPelanggan = await Pelanggan.create({
      pelanggan_nama,
      pelanggan_alamat,
      pelanggan_nomor,
      pelanggan_email,  // Store email
      pelanggan_password: hashedPassword
    });

    res.status(201).json({ message: 'Pelanggan berhasil terdaftar', pelanggan: newPelanggan });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ error: 'Gagal mendaftarkan pelanggan', details: error.message });
  }
};



const login = async (req, res) => {
  const { pelanggan_nama, pelanggan_password } = req.body;

  // Debug log untuk data yang diterima dari client
  console.log("Login attempt with username:", pelanggan_nama);

  try {
    // Cari pelanggan berdasarkan nama
    const pelanggan = await Pelanggan.findByName(pelanggan_nama);

    if (!pelanggan) {
      // Jika pelanggan tidak ditemukan
      return res.status(400).json({ error: 'User not found' });
    }

    // Verifikasi password yang diberikan oleh user
    const isPasswordValid = await bcrypt.compare(pelanggan_password, pelanggan.pelanggan_password);

    if (!isPasswordValid) {
      // Jika password salah
      return res.status(400).json({ error: 'Invalid name or password' });
    }

    // Jika valid, buat token JWT
    const token = jwt.sign({ id: pelanggan.pelanggan_id }, SECRET_KEY,
      // { expiresIn: '1h' }
    );

    // Kirim data pelanggan beserta token
    res.json({
      pelanggan_id: pelanggan.pelanggan_id,
      pelanggan_nama: pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan.pelanggan_alamat,
      pelanggan_nomor: pelanggan.pelanggan_nomor,
      pelanggan_email: pelanggan.pelanggan_email,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};





const updateProfile = async (req, res) => {
  const { pelanggan_nama, pelanggan_alamat, pelanggan_nomor, pelanggan_email, pelanggan_password } = req.body;

  try {
    const pelangganId = req.user.pelanggan_id; // Get ID from request object provided by JWT middleware
    console.log('Pelanggan ID from token:', pelangganId); // Debug: check ID from token

    // Get pelanggan object to be updated based on ID
    const pelanggan = await Pelanggan.findByPk(pelangganId);

    // Ensure pelanggan is found before proceeding with the update
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }

    // Update properties to be changed
    const updatedPelanggan = {
      pelanggan_nama: pelanggan_nama || pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan_alamat || pelanggan.pelanggan_alamat,
      pelanggan_nomor: pelanggan_nomor || pelanggan.pelanggan_nomor,
      pelanggan_email: pelanggan_email || pelanggan.pelanggan_email, // Add email update
    };

    // Hash password if present and set a new one
    if (pelanggan_password) {
      const hashedPassword = await bcrypt.hash(pelanggan_password, 10);
      updatedPelanggan.pelanggan_password = hashedPassword;
    }

    // Save changes to the database
    await Pelanggan.update(updatedPelanggan, { where: { pelanggan_id: pelangganId } });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};


const getProfile = async (req, res) => {
  try {
    // Gunakan req.user dari middleware authentication
    // Ini lebih aman dan langsung mengambil dari middleware
    const pelanggan = req.user;

    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }

    // Send response with pelanggan data, including email
    res.json({
      pelanggan_id: pelanggan.pelanggan_id,
      pelanggan_nama: pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan.pelanggan_alamat,
      pelanggan_nomor: pelanggan.pelanggan_nomor,
      pelanggan_email: pelanggan.pelanggan_email,
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      details: error.message
    });
  }
};


module.exports = { register, login, updateProfile, getProfile };
