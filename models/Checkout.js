const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');

const Checkout = sequelize.define('checkout', {
    checkout_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    keranjang_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checkout_waktu: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    checkout_status: {
        type: DataTypes.ENUM('menunggu', 'diproses', 'selesai'),
        defaultValue: 'menunggu',
    },
}, {
    tableName: 'checkout',
    timestamps: false,
});

module.exports = Checkout;
