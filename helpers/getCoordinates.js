const axios = require('axios');
const { API_KEY_OPEN_CAGE } = require('../constants/opencage');

const getCoordinates = async (address) => {
    const apiKey = API_KEY_OPEN_CAGE;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const location = response.data.results[0]?.geometry;

        if (location) {
            console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
            return { latitude: location.lat, longitude: location.lng }
        } else {
            return false
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return false
    }
};

module.exports = getCoordinates