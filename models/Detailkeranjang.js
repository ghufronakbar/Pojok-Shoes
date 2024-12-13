// models/DetailKeranjang.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');
const Layanan = require('../models/Layanan');

const detailkeranjang = sequelize.define('detailkeranjang', {
    detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    keranjang_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'keranjang', // Make sure the model matches the table name exactly
            key: 'keranjang_id'
        }
    },
    layanan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'layanan', // Make sure the model matches the table name exactly
            key: 'layanan_id'
        }
    },
    jumlah_sepatu: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    detail_harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    detail_status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'dipesan'        
    }

}, {
    tableName: 'detailkeranjang', 
    timestamps: false,
});

detailkeranjang.belongsTo(Layanan, {
    foreignKey: 'layanan_id',
    as: 'layanan'
});


module.exports = detailkeranjang;
