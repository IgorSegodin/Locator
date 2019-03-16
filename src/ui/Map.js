// import PropTypes from 'prop-types';
import Location from 'data/Location';
import React from "react";


class Map extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._map = new google.maps.Map(this.refs.mapContainer, {
            zoom: 8,
            center: {lat: 0, lng: 0}
        });

        this._locationMarker = null;
    }

    /**
     * @param location {Location}
     */
    setCenter(location) {
        this._map.setCenter({lat: location.getLatitude(), lng: location.getLongitude()});
    }

    /**
     * @param location {Location}
     */
    updateLocation(location) {
        if (this._locationMarker) {
            this._locationMarker.setMap(null);
        }

        this._locationMarker = new google.maps.Marker({
            map: this._map,
            position: {lat: location.getLatitude(), lng: location.getLongitude()},
            title: "You"
        });
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div ref="mapContainer"/>
            </div>
        );
    }
}

export default Map;