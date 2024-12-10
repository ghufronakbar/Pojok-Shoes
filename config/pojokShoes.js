const  Sequelize  = require('sequelize');

// Buat instance Sequelize
const sequelize = new Sequelize('db-sepatubaru', 'root', '', {
  host: 'localhost',
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
    console.log('Berhasil terhubung ke database  Pojok Shoescare');
  })
  .catch(error => {
    console.error('Gagal terhubung ke database:', error.message);
  });

module.exports = sequelize;