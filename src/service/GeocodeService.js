import Location from 'data/Location';

class GeocodeService {

    constructor(google) {
        this._geocoder = new google.maps.Geocoder();
    }

    /**
     * @param address {String}
     * @return {Promise<Location>}
     */
    geocodeAddress({address}) {
        const localThis = this;

        return new Promise(((resolve, reject) => {
            localThis._geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    const loc = results[0].geometry.location;

                    resolve(new Location({latitude: loc.lat, longitude: loc.lng}));
                } else {
                    throw new Error('Geocode was not successful for the following reason: ' + status);
                }
            });
        }));
    }

}

export default GeocodeService;