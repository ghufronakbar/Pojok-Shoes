const Keranjang = require('../models/Keranjang');

// Tambah keranjang
exports.addKeranjang = async (req, res) => {
    try {
        const { pelanggan_id, keranjang_jumlah_harga } = req.body;

        // Buat keranjang baru
        const newKeranjang = await Keranjang.create({
            pelanggan_id,
            keranjang_jumlah_harga,
            keranjang_tanggal: new Date(),
        });

        res.status(201).json(newKeranjang);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add keranjang' });
    }
};

// Lihat keranjang berdasarkan pelanggan_id
exports.lihatKeranjang = async (req, res) => {
    try {
        const { pelanggan_id } = req.params;
        const keranjang = await Keranjang.findAll({ where: { pelanggan_id } });

        if (keranjang.length === 0) {
            return res.status(404).json({ message: 'Keranjang not found' });
        }

        res.status(200).json(keranjang);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve keranjang' });
    }
};

// Hapus keranjang berdasarkan keranjang_id
exports.hapusKeranjang = async (req, res) => {
    try {
        const { keranjang_id } = req.params;
        const keranjang = await Keranjang.destroy({ where: { keranjang_id } });

        if (!keranjang) {
            return res.status(404).json({ message: 'Keranjang not found' });
        }

        res.status(200).json({ message: 'Keranjang deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete keranjang' });
    }
};

// Update total harga keranjang
exports.updateKeranjangJumlahHarga = async (req, res) => {
    try {
        const { keranjang_id } = req.params; // Ambil keranjang_id dari parameter URL
        const { keranjang_jumlah_harga } = req.body; // Ambil total harga baru dari body request

        // Cari keranjang berdasarkan keranjang_id
        const keranjang = await Keranjang.findByPk(keranjang_id);

        if (!keranjang) {
            return res.status(404).json({ message: 'Keranjang not found' });
        }

        // Perbarui jumlah harga keranjang
        keranjang.keranjang_jumlah_harga = keranjang_jumlah_harga;
        await keranjang.save();

        res.status(200).json({
            message: 'Keranjang total harga updated successfully',
            keranjang,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update keranjang total harga' });
    }
};
