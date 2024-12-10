const { DataTypes } = require('sequelize');
const sequelize = require('../config/pojokShoes');

const Checkout = sequelize.define('Checkout', {
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
        type: DataTypes.ENUM('dipesan', 'dijemput', 'diproses', 'dibayar', 'selesai'),
        defaultValue: 'dipesan',
    },
}, {
    tableName: 'Checkout',
    timestamps: false,
});

module.exports = Checkout;
