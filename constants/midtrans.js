require('dotenv').config()
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY

module.exports = {
    MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY,
}