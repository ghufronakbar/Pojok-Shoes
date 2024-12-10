const DEFAULT_LATITUDE = -7.744567780559918;
const DEFAULT_LONGITUDE = 110.29420793068677;

exports.calcShippingCost = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            return res.status(400).json({ error: 'latitude and longitude must be numbers' });
        }

        const distance = getDistanceFromLatLonInKm(DEFAULT_LATITUDE, DEFAULT_LONGITUDE, Number(latitude), Number(longitude));
        const normalized_distance = Math.round(distance);
        const currency = 'IDR';

        let shipping_cost = 0

        if (normalized_distance > 2) {
            shipping_cost = normalized_distance * 4000
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

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return d = R * c; // Distance in km    
}

const deg2rad = (deg) => deg * (Math.PI / 180)

