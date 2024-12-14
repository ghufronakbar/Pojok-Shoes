const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Pelanggan = require('../models/Pelanggan');
const { Sequelize } = require('sequelize');
const { SECRET_KEY } = require('../constants');
const removeCloudinary = require('../helpers/cloudinary/removeCloudinary');

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
  // console.log("Login attempt with username:", pelanggan_nama);

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
      ...pelanggan.dataValues,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};





const updateProfile = async (req, res) => {
  const { pelanggan_nama, pelanggan_alamat, pelanggan_nomor, pelanggan_email } = req.body;

  try {
    const pelangganId = req.user.pelanggan_id;

    const pelanggan = await Pelanggan.findByPk(pelangganId);


    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }

    const checkEmailPhone = await Pelanggan.findOne({
      where: {
        [Sequelize.Op.or]: [
          { pelanggan_nomor: pelanggan_nomor },
          { pelanggan_email: pelanggan_email },
          { pelanggan_nama: pelanggan_nama }
        ]
      }
    });

    console.log({ checkEmailPhonePelangganId: checkEmailPhone?.pelanggan_id, pelangganId });

    if (checkEmailPhone && checkEmailPhone.pelanggan_id !== pelangganId) {
      return res.status(400).json({ error: 'Nomor telepon, email, atau username sudah terdaftar' });
    }


    const updatedPelanggan = {
      pelanggan_nama: pelanggan_nama || pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan_alamat || pelanggan.pelanggan_alamat,
      pelanggan_nomor: pelanggan_nomor || pelanggan.pelanggan_nomor,
      pelanggan_email: pelanggan_email || pelanggan.pelanggan_email,
    };


    await Pelanggan.update(updatedPelanggan, { where: { pelanggan_id: pelangganId } });

    const pelangganUpdated = await Pelanggan.findByPk(pelangganId);

    res.json({ message: 'Profile updated successfully', ...pelangganUpdated.dataValues });
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { new_password, old_password } = req.body;

  if (!new_password || !old_password) {
    return res.status(400).json({ error: 'New password and old password are required' });
  }

  try {
    const pelangganId = req.user.pelanggan_id;

    const pelanggan = await Pelanggan.findByPk(pelangganId);

    if (!pelanggan) {
      return res.status(404).json({ message: 'Pelanggan not found' });
    }

    // Memeriksa apakah password lama cocok dengan password di database
    const isPasswordValid = await bcrypt.compare(old_password, pelanggan.pelanggan_password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password Lama Salah' });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password di database
    await Pelanggan.update({ pelanggan_password: hashedPassword }, { where: { pelanggan_id: pelangganId } });

    res.json({ message: 'Berhasil mengganti password' });
  } catch (error) {
    console.error('Failed to update password:', error);
    res.status(500).json({ error: 'Failed to update password', details: error.message });
  }
}


const getProfile = async (req, res) => {
  try {    
    const pelanggan = req.user;

    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }
    
    res.json({
      pelanggan_id: pelanggan.pelanggan_id,
      pelanggan_nama: pelanggan.pelanggan_nama,
      pelanggan_alamat: pelanggan.pelanggan_alamat,
      pelanggan_nomor: pelanggan.pelanggan_nomor,
      pelanggan_email: pelanggan.pelanggan_email,
      pelanggan_picture: pelanggan.pelanggan_picture
    });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      details: error.message
    });
  }
};


const postPicture = async (req, res) => {
  try {
    const picture = req.file;
    const { pelanggan_id } = req.user;
    if (!picture) {
      return res.status(400).json({ error: 'No picture uploaded' });
    }
    const pelanggan = await Pelanggan.findByPk(pelanggan_id);
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }
    if (pelanggan.pelanggan_picture) {
      removeCloudinary(pelanggan.pelanggan_picture, 'profile');
    }
    pelanggan.pelanggan_picture = picture.path;
    const updatedPelanggan = await pelanggan.save();
    res.json({ message: 'Picture uploaded successfully', ...updatedPelanggan.dataValues });

  }
  catch (error) {
    console.error('Error uploading picture:', error);
    res.status(500).json({
      error: 'Failed to upload picture',
      details: error.message
    });
  }
}

const deletePicture = async (req, res) => {
  try {
    const { pelanggan_id } = req.user;
    const pelanggan = await Pelanggan.findByPk(pelanggan_id);
    if (!pelanggan) {
      return res.status(404).json({ error: 'Pelanggan not found' });
    }
    if (pelanggan.pelanggan_picture) {
      removeCloudinary(pelanggan.pelanggan_picture, 'profile');
    }
    pelanggan.pelanggan_picture = null;
    const updatedPelanggan = await pelanggan.save();
    res.json({ message: 'Picture deleted successfully', ...updatedPelanggan.dataValues });
  }
  catch (error) {
    console.error('Error deleting picture:', error);
    res.status(500).json({
      error: 'Failed to delete picture',
      details: error.message
    });
  }
}


module.exports = { register, login, updateProfile, getProfile, updatePassword, postPicture, deletePicture };
