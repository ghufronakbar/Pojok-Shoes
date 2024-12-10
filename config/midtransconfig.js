const midtransClient = require('midtrans-client');

const midtrans = new midtransClient.Snap({
    isProduction: false, // Set ke true untuk environment production
    serverKey: 'SB-Mid-server-f8H8CZX1-QgWp36zWfztt4tQ', // Ganti dengan server key Anda
    clientKey: 'SB-Mid-client-Uts0BqfcnEk8-8BT', // Ganti dengan client key Anda
});

module.exports = midtrans;
