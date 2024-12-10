require('dotenv').config()
const PORT = process.env.PORT
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY
const SECRET_KEY = process.env.SECRET_KEY
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

module.exports = {
    PORT,
    MIDTRANS_SERVER_KEY,
    MIDTRANS_CLIENT_KEY,
    SECRET_KEY,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
}