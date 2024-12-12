const DetailKeranjang = require('../models/Detailkeranjang');
const Layanan = require('../models/Layanan');
const Keranjang = require('../models/Keranjang');

exports.addDetailKeranjang = async (req, res) => {
    try {
        const { keranjang_id, layanan } = req.body;

        // Validasi jika layanan adalah array atau objek tunggal
        const layananDatas = Array.isArray(layanan) ? layanan : [layanan];

        for (const layananData of layananDatas) {
            const layanan = await Layanan.findByPk(layananData.layanan_id);
            if (!layanan) {
                return res.status(404).json({ error: 'Layanan tidak ditemukan' });
            }
            layananData.detail_harga = layanan.layanan_harga * layananData.jumlah_sepatu;
        }

        // Membuat entri detail keranjang untuk setiap item layanan
        const detailKeranjangItems = layananDatas.map(async (item) => {            
            return await DetailKeranjang.create({
                keranjang_id,
                layanan_id: item.layanan_id,
                jumlah_sepatu: item.jumlah_sepatu,
                detail_harga: item.detail_harga
            });
        });
        const newDetails = await Promise.all(detailKeranjangItems);
        
        const detailKeranjangs = await DetailKeranjang.findAll({ where: { keranjang_id } });
        let newTotal = 0;

        for (const detailKeranjang of detailKeranjangs) {
            newTotal += detailKeranjang.detail_harga
            console.log({ newTotal })
        }

        
        const [updatedRows] = await Keranjang.update({ keranjang_jumlah_harga: newTotal }, { where: { keranjang_id } });
        
        if (updatedRows === 0) {
            return res.status(500).json({ error: 'Failed to update keranjang_jumlah_harga' });
        }
        // Menunggu semua entri layanan ditambahkan ke database
        
        // const findUpdatedKeranjang = await Keranjang.findOne({ where: { keranjang_id } });
        res.status(201).json({
            message: 'Detail keranjang berhasil ditambahkan',
            data: newDetails
        });
    } catch (error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ error: 'Failed to add detail to keranjang', details: error.message });
    }
};

exports.viewDetailKeranjang = async (req, res) => {
    try {
        const { keranjang_id } = req.params;

        if (!keranjang_id) {
            return res.status(400).json({ error: 'keranjang_id is required' });
        }

        // Validate that keranjang_id is a number
        if (isNaN(keranjang_id)) {
            return res.status(400).json({ error: 'keranjang_id must be a number' });
        }

        const details = await DetailKeranjang.findAll({
            where: { keranjang_id },
            include: [{
                model: Layanan,
                as: 'layanan',
                attributes: ['layanan_nama', "layanan_picture", "status"],
                required: true
            }]
        });

        if (!details || details.length === 0) {
            return res.status(404).json({
                message: 'No details found for this keranjang'
            });
        }

        const formattedDetails = details.map(detail => ({
            detail_id: detail?.detail_id,
            layanan_nama: detail.layanan?.layanan_nama || 'Unknown Service',
            jumlah_sepatu: detail?.jumlah_sepatu,
            detail_harga: detail?.detail_harga,
            layanan_picture: detail.layanan?.layanan_picture,
            layanan_status: detail.layanan?.status
        }));

        res.status(200).json({
            success: true,
            data: formattedDetails
        });

    } catch (error) {
        console.error('Error in viewDetailKeranjang:', error);
        res.status(500).json({
            error: 'Failed to retrieve details for keranjang',
            message: error.message
        });
    }
};

exports.deleteDetailKeranjang = async (req, res) => {
    try {
        const { detail_id } = req.params;

        // Mengambil detail harga untuk item yang akan dihapus
        const detail = await DetailKeranjang.findOne({
            where: { detail_id },
            attributes: ['detail_harga', 'keranjang_id']
        });

        if (!detail) {
            return res.status(404).json({ error: 'Detail not found' });
        }

        // Menghapus detail dari keranjang berdasarkan ID
        const deleted = await DetailKeranjang.destroy({
            where: { detail_id }
        });

        if (deleted) {
            // Mengambil semua detail keranjang yang tersisa untuk keranjang tersebut
            const keranjang = await DetailKeranjang.findAll({
                where: { keranjang_id: detail.keranjang_id },
                attributes: ['detail_harga']
            });

            let totalHarga = 0;
            if (keranjang.length > 0) {
                // Menghitung harga total baru
                totalHarga = keranjang.reduce((total, item) => total + item.detail_harga, 0);
            }

            // Mengupdate harga total keranjang di kolom keranjang_jumlah_harga
            const [updated] = await Keranjang.update(
                { keranjang_jumlah_harga: totalHarga },
                { where: { keranjang_id: detail.keranjang_id } }
            );

            // Mengecek apakah update berhasil
            if (updated === 0) {
                console.error('Failed to update keranjang_jumlah_harga for keranjang');
                return res.status(500).json({ error: 'Failed to update harga total keranjang' });
            }

            // Mengembalikan response dengan total harga baru
            res.status(200).json({
                message: 'Detail deleted and harga updated successfully',
                totalHarga: totalHarga
            });
        } else {
            res.status(404).json({ error: 'Detail not found' });
        }
    } catch (error) {
        console.error('Error in deleteDetailKeranjang:', error);
        res.status(500).json({
            error: 'Failed to delete detail from keranjang',
            details: error.message
        });
    }
};
