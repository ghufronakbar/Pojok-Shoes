const getDistance = require("../helpers/getDistance");

const SHIPPING_COST = 4000

exports.calcShippingCost = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            return res.status(400).json({ error: 'latitude and longitude must be numbers' });
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

