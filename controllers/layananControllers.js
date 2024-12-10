const Layanan = require('../models/Layanan');
const { Op } = require('sequelize');

// Mendapatkan layanan berdasarkan kategori (group ID)
const getLayananByKategori = async (req, res) => {
  const { kategori } = req.params; // Mendapatkan kategori dari parameter URL

  try {
    let layanan;

    // Menentukan kelompok ID berdasarkan kategori
    switch (kategori.toLowerCase()) {
      case 'group-1': // ID 1-3
        layanan = await Layanan.findAll({
          where: {
            layanan_id: {
              [Op.between]: [1, 3] // Mengambil layanan dengan ID 1 hingga 3
            }
          }
        });
        break;
      case 'group-2': // ID 4-6
        layanan = await Layanan.findAll({
          where: {
            layanan_id: {
              [Op.between]: [4, 6] // Mengambil layanan dengan ID 4 hingga 6
            }
          }
        });
        break;
      case 'group-3': // ID 7-9
        layanan = await Layanan.findAll({
          where: {
            layanan_id: {
              [Op.between]: [7, 9] // Mengambil layanan dengan ID 7 hingga 9
            }
          }
        });
        break;
      case 'group-4': // ID 10-12
        layanan = await Layanan.findAll({
          where: {
            layanan_id: {
              [Op.between]: [10, 12] // Mengambil layanan dengan ID 10 hingga 12
            }
          }
        });
        break;
      default:
        return res.status(400).json({ error: 'Kategori tidak valid' });
    }


    // Jika layanan tidak ditemukan
    if (layanan.length === 0) {
      return res.status(404).json({ error: `Layanan dengan kategori ${kategori} tidak ditemukan` });
    }

    res.json(layanan); // Mengembalikan data layanan yang sesuai dengan kategori
  } catch (error) {
    console.error('Error saat mendapatkan layanan berdasarkan kategori:', error);
    res.status(500).json({ error: 'Gagal mendapatkan layanan', details: error.message });
  }
};

// Mendapatkan semua layanan
const getAllLayanan = async (req, res) => {
  try {
    const layanan = await Layanan.findAll();
    res.json(layanan);
  } catch (error) {
    console.error('Error saat mendapatkan layanan:', error);
    res.status(500).json({ error: 'Gagal mendapatkan layanan', details: error.message });
  }
};

// Mendapatkan layanan berdasarkan ID
const getLayananById = async (req, res) => {
  const { id } = req.params; // Mendapatkan ID dari parameter URL

  try {
    const layanan = await Layanan.findByPk(id); // Mencari layanan berdasarkan ID

    if (!layanan) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    res.json(layanan); // Mengembalikan data layanan jika ditemukan
  } catch (error) {
    console.error('Error saat mendapatkan layanan berdasarkan ID:', error);
    res.status(500).json({ error: 'Gagal mendapatkan layanan', details: error.message });
  }
};

// Menambah layanan baru
const createLayanan = async (req, res) => {
  const { layanan_nama, layanan_harga, layanan_deskripsi } = req.body;
  
  try {
    const newLayanan = await Layanan.create({
      layanan_nama,
      layanan_harga,
      layanan_deskripsi
    });

    res.status(201).json({ message: 'Layanan berhasil ditambahkan', layanan: newLayanan });
  } catch (error) {
    console.error('Error saat menambah layanan:', error);
    res.status(500).json({ error: 'Gagal menambah layanan', details: error.message });
  }
};

// Memperbarui layanan berdasarkan ID
const updateLayanan = async (req, res) => {
  const { id } = req.params;
  const { layanan_nama, layanan_harga, layanan_deskripsi } = req.body;

  try {
    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    layanan.layanan_nama = layanan_nama || layanan.layanan_nama;
    layanan.layanan_harga = layanan_harga || layanan.layanan_harga;
    layanan.layanan_deskripsi = layanan_deskripsi || layanan.layanan_deskripsi;

    await layanan.save();

    res.json({ message: 'Layanan berhasil diperbarui', layanan });
  } catch (error) {
    console.error('Error saat memperbarui layanan:', error);
    res.status(500).json({ error: 'Gagal memperbarui layanan', details: error.message });
  }
};

// Menghapus layanan berdasarkan ID
const deleteLayanan = async (req, res) => {
  const { id } = req.params;

  try {
    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }

    await layanan.destroy();
    res.json({ message: 'Layanan berhasil dihapus' });
  } catch (error) {
    console.error('Error saat menghapus layanan:', error);
    res.status(500).json({ error: 'Gagal menghapus layanan', details: error.message });
  }
};

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  getLayananByKategori
};
