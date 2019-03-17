import Location from 'data/Location';

/**
 * https://www.movable-type.co.uk/scripts/latlong.html
 */

const EARTH_RADIUS_M = 6.371 * Math.pow(10, 6);

/**
 * @param angle {Number} degrees
 * @return {number} radians
 */
function angleToRadians(angle) {
    return angle * Math.PI / 180;
}

class LocationService {

    /**
     * @return {Promise<Location>}
     */
    getLocation() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(new Location({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                }, function () {
                    console.warn("The Geolocation service failed.");
                    resolve(new Location({latitude: null, longitude: null}));
                });
            });
        } else {
            console.warn("Your browser doesn't support geolocation.");
            return Promise.resolve(new Location({latitude: null, longitude: null}));
        }
    }

    /**
     * @param center {Location}
     * @param point {Location}
     * @return {number} meters
     */
    calcDistance({center, point}) {
        const latR1 = angleToRadians(center.getLatitude());
        const lngR1 = angleToRadians(center.getLongitude());

        const latR2 = angleToRadians(point.getLatitude());
        const lngR2 = angleToRadians(point.getLongitude());

        const x = (lngR2 - lngR1) * Math.cos((latR1 + latR2) / 2);
        const y = (latR2 - latR1);

        return Math.sqrt(x * x + y * y) * EARTH_RADIUS_M;
    }
}

export default LocationService;