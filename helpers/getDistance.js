const DEFAULT_LATITUDE = -7.744567780559918;
const DEFAULT_LONGITUDE = 110.29420793068677;

const getDistance = (lat1, lon1) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(DEFAULT_LATITUDE - lat1);  // deg2rad below
    const dLon = deg2rad(DEFAULT_LONGITUDE - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(DEFAULT_LATITUDE)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return d = R * c; // Distance in km    
}

const deg2rad = (deg) => deg * (Math.PI / 180)

module.exports = getDistance