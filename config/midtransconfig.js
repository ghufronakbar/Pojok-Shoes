const midtransClient = require('midtrans-client');
const { MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY } = require('../constants');

const midtrans = new midtransClient.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY,
});

module.exports = midtrans;
