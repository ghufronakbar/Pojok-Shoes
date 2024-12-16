const getCoordinates = require("../helpers/getCoordinates");
const getDistance = require("../helpers/getDistance");
const Pelanggan = require("../models/Pelanggan");
const SHIPPING_COST = 4000

exports.calcShippingCost = async (req, res) => {
    try {
        const pelanggan_id = req?.user?.pelanggan_id;

        const user = await Pelanggan.findOne({
            where: {
                pelanggan_id
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Pelanggan not found' });
        }

        let latitude = user.latitude;
        let longitude = user.longitude;

        if (user.latitude === null || user.longitude === null || user.latitude == 0 || user.longitude == 0) {
            const coor = await getCoordinates(user.pelanggan_alamat);
            if (!coor) {
                return res.status(200).json({ error: 'Alamat tidak valid', success: false });
            } else {
                latitude = coor.latitude;
                longitude = coor.longitude;
            }
        }

        const distance = getDistance(Number(latitude), Number(longitude));
        const normalized_distance = Math.round(distance);
        const currency = 'IDR';

        let shipping_cost = 0

        if (normalized_distance > 2) {
            shipping_cost = normalized_distance * SHIPPING_COST
        }

        res.status(200).json({
            distance, normalized_distance, shipping_cost, currency
        });
    } catch (error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ error: 'Failed to add detail to keranjang', details: error.message });
    }
};

