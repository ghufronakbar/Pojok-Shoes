const Layanan = require('../models/Layanan');
const { Op } = require('sequelize');
const removeCloudinary = require('../helpers/cloudinary/removeCloudinary');

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
    const layanans = await Layanan.findAll();
    res.json(layanans);
  } catch (error) {
    console.error('Error saat mendapatkan layanan:', error);
    res.status(500).json({ error: 'Gagal mendapatkan layanan', details: error.message });
  }
};

const getLayananCheck = async (req, res) => {
  try {

    const queryLayanan = async (name) => await Layanan.findAll({ where: { layanan_nama: { [Op.startsWith]: name } } })

    const [fastClean, deepClean, reglue, recolor] = await Promise.all([
      queryLayanan('Fast Clean'),
      queryLayanan('Deep Clean'),
      queryLayanan('Reglue'),
      queryLayanan('Recolor'),
    ]);

    const data = {
      fast_clean: {
        name: "Fast Clean",
        picture: fastClean.find(layanan => layanan?.layanan_picture !== null)?.layanan_picture || null,
        layanan_deskripsi: fastClean.find(layanan => layanan?.layanan_deskripsi !== null)?.layanan_deskripsi || '',
      },
      deep_clean: {
        name: "Deep Clean",
        picture: deepClean.find(layanan => layanan?.layanan_picture !== null)?.layanan_picture || null,
        layanan_deskripsi: deepClean.find(layanan => layanan?.layanan_deskripsi !== null)?.layanan_deskripsi || '',
      },
      reglue: {
        name: "Reglue",
        picture: reglue.find(layanan => layanan?.layanan_picture !== null)?.layanan_picture || null,
        layanan_deskripsi: reglue.find(layanan => layanan?.layanan_deskripsi !== null)?.layanan_deskripsi || '',
      },
      recolor: {
        name: "Recolor",
        picture: recolor.find(layanan => layanan?.layanan_picture !== null)?.layanan_picture || null,
        layanan_deskripsi: recolor.find(layanan => layanan?.layanan_deskripsi !== null)?.layanan_deskripsi || '',
      }
    }

    return res.json(data)
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

const editPictureLayanan = async (req, res) => {
  const { id } = req.params
  const file = req.file
  if (!file) {
    return res.status(404).json({ error: 'File tidak ditemukan' });
  }
  if (isNaN(id)) {
    removeCloudinary(file.path, 'layanan');
    return res.status(404).json({ error: 'ID harus angka' });
  }
  try {
    const layanan = await Layanan.findByPk(id);
    if (!layanan) {
      removeCloudinary(file.path, 'layanan');
      return res.status(404).json({ error: 'Layanan tidak ditemukan' });
    }
    if (layanan.layanan_picture) {
      removeCloudinary(layanan.layanan_picture, 'layanan');
    }
    layanan.layanan_picture = file.path;
    await layanan.save();
    return res.json({ message: 'Layanan berhasil diperbarui', layanan });
  } catch (error) {
    console.error('Error saat mengedit gambar layanan:', error);
    res.status(500).json({ error: 'Gagal menghapus layanan', details: error.message });
  }
}

module.exports = {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  getLayananByKategori,
  getLayananCheck,
  editPictureLayanan
};

