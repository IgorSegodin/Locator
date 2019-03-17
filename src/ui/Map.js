// import PropTypes from 'prop-types';
import Location from 'data/Location';
import React from "react";

const __mapEl__ = document.createElement("div");
__mapEl__.setAttribute("style", "width: 100%; height: 100%");

let __map__;
let __locationMarker__;
let __markers__ = [];

class Map extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);

        if (!__map__) {
            __map__ = new google.maps.Map(__mapEl__, {
                zoom: 8,
                center: {lat: 0, lng: 0}
            });
        }
    }

    componentDidMount() {
        const mapContainer = this.refs.mapContainer;
        if (mapContainer.children.length === 0) {
            mapContainer.appendChild(__mapEl__);
        }
    }

    /**
     * @param location {Location}
     */
    setCenter(location) {
        __map__.setCenter({lat: location.getLatitude(), lng: location.getLongitude()});
    }

    /**
     * @param zoom {Number}
     */
    setZoom(zoom) {
        __map__.setZoom(zoom);
    }

    /**
     * @param location {Location}
     */
    updateLocation(location) {
        if (__locationMarker__) {
            __locationMarker__.setMap(null);
        }

        __locationMarker__ = new google.maps.Marker({
            map: __map__,
            position: {lat: location.getLatitude(), lng: location.getLongitude()},
            title: "You"
        });
    }

    /**
     * @param location {Location}
     * @param name {String}
     */
    addMarker({location, name}) {
        __markers__.push(
            new google.maps.Marker({
                map: __map__,
                position: {lat: location.getLatitude(), lng: location.getLongitude()},
                title: name
            })
        );
    }

    clearMarkers() {
        __markers__.forEach((m) => m.setMap(null));
        __markers__ = [];
    }

    render() {
        return (
            <div ref="mapContainer" style={{width: "100%", height: "100%"}}>
            </div>
        );
    }
}

/*

TODO map.fitBounds(bounds) after search.

TODO map.setZoom(your desired zoom) on show place

If you only have 1 marker and add it to the bounds, that results in the closest zoom possible:

function addMarker(lat, lng, info) {
  var pt = new google.maps.LatLng(lat, lng);
  bounds.extend(pt);
}

 */

export default Map;