require('dotenv').config()
const PORT = process.env.PORT
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY
const SECRET_KEY = process.env.SECRET_KEY

module.exports = {
    PORT,
    MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY,
    SECRET_KEY
}