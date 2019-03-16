import PropTypes from 'prop-types';
import React from "react";

import GeocodeService from 'service/GeocodeService';
import LocationService from 'service/LocationService';
import PlacesService from 'service/PlacesService';
import Controls from 'ui/Controls';

import Map from 'ui/Map';

class MainView extends React.Component {

    static propTypes = {
        locationService: PropTypes.instanceOf(LocationService).isRequired,
        geocodeService: PropTypes.instanceOf(GeocodeService).isRequired,
        placesService: PropTypes.instanceOf(PlacesService).isRequired,
    };

    constructor(props) {
        super(props);

        this._location = null;
    }

    componentDidMount() {
        const thisView = this;
        this.props.locationService.getLocation().then((location) => {
            thisView._location = location;
            thisView.centerMap();
            thisView.updateLocation();
        });
    }

    centerMap() {
        this.refs.map.setCenter(this._location);
    }

    updateLocation() {
        this.refs.map.updateLocation(this._location);
    }

    render() {
        return (
            <div>
                <div style={{width: "300px", height: "100%", float: "left", backgroundColor: "#5b5b5b"}}>
                    <div style={{width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "10px", backgroundColor: "white"}}>
                        <Controls/>
                    </div>
                </div>
                <div style={{width: "calc(100% - 300px)", height: "100%", float: "right"}}>
                    <Map ref="map"/>
                </div>
            </div>
        );
    }
}

/*

placesService.findNearbyPlaces({query: "киев макдональдс", center: location, radius: 20000})
                .then((data) => {
                    data.forEach((place) => {
                        const location = place.getLocation();
                        console.log(place);

                        new google.maps.Marker({
                            map: map,
                            position: {lat: location.getLatitude(), lng: location.getLongitude()},
                            title: "Mc"
                        });
                    });
                });

 */

export default MainView;