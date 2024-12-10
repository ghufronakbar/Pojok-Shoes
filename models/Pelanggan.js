const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');

const Pelanggan = sequelize.define('Pelanggan', {
  pelanggan_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pelanggan_nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pelanggan_alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pelanggan_nomor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pelanggan_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pelanggan_email: {  // New field for email
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Ensure email is unique
    validate: {
      isEmail: true // Ensure email format is valid
    }
  }
}, {
  tableName: 'pelanggan',
  timestamps: false
});

// Custom method for Pelanggan
Pelanggan.findByName = async function(name) {
  return await this.findOne({ where: { pelanggan_nama: name } });
};

// Ekspor model
module.exports = Pelanggan;
