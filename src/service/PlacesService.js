import Location from "data/Location";
import Place from 'data/Place';

/*
https://developers.google.com/maps/documentation/javascript/places
 */

class PlacesService {

    constructor(google, map) {
        this._service = new google.maps.places.PlacesService(map);
    }

    /**
     * @param searchString {String}
     * @param center {Location}
     * @param radius {Number}
     * @return Promise<Array<Place>>
     */
    findNearbyPlaces({searchString, center, radius}) {
        const localThis = this;
        const request = {
            keyword: searchString,
            // fields: ['name', 'geometry', 'formatted_address'],
            // fields: "name, geometry",
            radius: radius,
            location: {
                lat: center.getLatitude(),
                lng: center.getLongitude()
            }
        };

        return new Promise(((resolve, reject) => {
            localThis._service.nearbySearch(request, function (results, status) {
                if (status === "OK") {
                    resolve(
                        results.map((p) => {
                            const loc = p.geometry.location;

                            return new Place({
                                name: p.name,
                                address: p.vicinity,
                                location: new Location({latitude: loc.lat(), longitude: loc.lng()})
                            })
                        })
                    );
                }
            });
        }));
    }

}

export default PlacesService;