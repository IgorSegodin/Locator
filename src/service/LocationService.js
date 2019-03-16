import Location from 'data/Location';

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
}

export default LocationService;