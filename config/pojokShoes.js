require('dotenv').config();
const Sequelize = require('sequelize');
const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = require('../constants');

// Buat instance Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    timezone: '+00:00',
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Uji koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('Berhasil terhubung ke database ' + DB_NAME);
  })
  .catch(error => {
    console.error('Gagal terhubung ke database:', error.message);
  });

module.exports = sequelize;