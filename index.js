require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/pojokShoes');

const routesUser = require('./routes/routesUser');
const routesHistory = require('./routes/routesHistory');
const routesHelper = require('./routes/routesHelper');
const routesLayanan = require('./routes/routesLayanan');
const routesKeranjang = require('./routes/routesKeranjang');
const routesDetailkeranjang = require('./routes/routesDetailkeranjang');
const routesCheckout = require('./routes/routesCheckout');
const routesPembayaran = require('./routes/routesPembayaran');
const routesMidtransWebhook = require('./routes/api');
const { PORT, IS_PRODUCTION } = require('./constants');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routesUser);
app.use('/api/history', routesHistory);
app.use('/api/helper', routesHelper);
app.use('/api/layanan', routesLayanan);
app.use('/api/keranjang', routesKeranjang);
app.use('/api/detailkeranjang', routesDetailkeranjang);
app.use('/api/checkout', routesCheckout);
app.use('/api/pembayaran', routesPembayaran); // Tambahkan route pembayaran
app.use('/api/webhook', routesMidtransWebhook);

// Synchronize the database models
IS_PRODUCTION === "true" && sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Unable to synchronize the database:', err);
  });

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
