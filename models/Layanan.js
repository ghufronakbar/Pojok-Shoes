const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');


const Layanan = sequelize.define('Layanan', {
  layanan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  layanan_nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  layanan_harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  layanan_deskripsi: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'layanan',
  timestamps: false
});

module.exports = Layanan;
