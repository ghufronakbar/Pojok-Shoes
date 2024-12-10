// models/Pembayaran.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');

const Pembayaran = sequelize.define('Pembayaran', {
  pembayaran_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  checkout_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Checkout',
      key: 'checkout_id',
    },
    allowNull: false,
  },
  pembayaran_jumlahbayar: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
  },
  pembayaran_metode: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pembayaran_status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pembayaran_waktu: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  snaptoken: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'Pembayaran',
  timestamps: false,
});

module.exports = Pembayaran;
