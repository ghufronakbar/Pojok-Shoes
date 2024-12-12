const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');

const Keranjang = sequelize.define('keranjang', {
    keranjang_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pelanggan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    keranjang_tanggal: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    keranjang_jumlah_harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    keranjang_status: {
        type: DataTypes.ENUM('0', '1'), // Sesuai dengan struktur ENUM di database
        allowNull: false,
        defaultValue: '1', // Nilai default jika tidak diatur
    },
}, {
    tableName: 'keranjang',
    timestamps: false,
});

module.exports = Keranjang;
