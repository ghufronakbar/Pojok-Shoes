const Pembayaran = require('../models/Pembayaran'); // Model Pembayaran
const midtrans = require('../config/midtransconfig'); // Pastikan konfigurasi Midtrans sudah benar
const Checkout = require('../models/Checkout');


// Fungsi untuk membuat pembayaran
const buatPembayaran = async (checkout_id, jumlahbayar) => {
  try {
    // Cek apakah checkout_id valid
    const checkout = await Checkout.findByPk(checkout_id);
    if (!checkout) {
      throw new Error('Checkout tidak ditemukan');
    }

    // Parameter untuk transaksi Midtrans
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${checkout_id}`, // Pastikan order_id unik
        gross_amount: jumlahbayar,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: 'John', // Ganti dengan data pelanggan yang sesuai
        email: 'john.doe@example.com',
      },
    };

    // Request ke Midtrans untuk mendapatkan snaptoken
    const snapResponse = await midtrans.createTransaction(parameter);

    // Simpan data pembayaran ke database
    const pembayaran = await Pembayaran.create({
      checkout_id: checkout_id,
      pembayaran_jumlahbayar: jumlahbayar,
      pembayaran_metode: 'credit_card', // Ganti sesuai dengan metode pembayaran
      pembayaran_status: 'snapResponse.transaction_status',
      snaptoken: snapResponse.token,
    });

    // Kembalikan response dari Midtrans untuk digunakan di frontend
    return snapResponse;
  } catch (error) {
    console.error('Error saat membuat pembayaran:', error);
    throw error;
  }
};

module.exports = Pembayaran;
