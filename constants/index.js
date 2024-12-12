require('dotenv').config()
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const IS_PRODUCTION = process.env.IS_PRODUCTION
const APP_URL = process.env.APP_URL

module.exports = {
    PORT,
    SECRET_KEY,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    IS_PRODUCTION,
    APP_URL
}