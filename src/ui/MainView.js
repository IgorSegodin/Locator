import PropTypes from 'prop-types';
import React from "react";

import GeocodeService from 'service/GeocodeService';
import LocationService from 'service/LocationService';
import PlacesService from 'service/PlacesService';
import Controls from 'ui/Controls';

import Map from 'ui/Map';

function PlaceList({places, onShowPlace, locationService, center}) {
    return (
        <ul>
            {places.map(p => {
                console.log(p.getAddress() + ": " + locationService.calcDistance({center, point: p.getLocation()}));
                return (
                    <li key={p.getAddress()}>
                        <span>{p.getName()}</span>,
                        <span style={{color: "gray"}}> {p.getAddress()}</span>
                        <span style={{color: "blue", cursor: "pointer"}}
                              onClick={() => {
                                  onShowPlace(p);
                              }}> view</span>
                    </li>
                );
            })}
        </ul>
    );
}

class MainView extends React.Component {

    static propTypes = {
        locationService: PropTypes.instanceOf(LocationService).isRequired,
        geocodeService: PropTypes.instanceOf(GeocodeService).isRequired,
        placesService: PropTypes.instanceOf(PlacesService).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            location: null,
            places: null,
            radius: 20000
        }
    }

    componentDidMount() {
        const thisView = this;
        this.props.locationService.getLocation().then((location) => {
            thisView.setState({
                ...thisView.state,
                location: location
            });

            thisView.centerMap(this.state.location);
            thisView.updateLocation();
        });
    }

    /**
     * @param location {Location}
     */
    centerMap(location) {
        this.refs.map.setCenter(location);
    }

    zoomMap(zoom) {
        this.refs.map.setZoom(zoom);
    }

    updateLocation() {
        this.refs.map.updateLocation(this.state.location);
    }

    /**
     * @param place {Place}
     */
    addMarker(place) {
        this.refs.map.addMarker({location: place.getLocation(), name: place.getName()})
    }

    clearMarkers() {
        this.refs.map.clearMarkers();
    }

    onSearch = (value) => {
        const thisView = this;
        thisView.props.placesService.findNearbyPlaces({searchString: value, center: this.state.location, radius: this.state.radius})
            .then((data) => {
                thisView.clearMarkers();

                data.forEach((place) => {
                    thisView.addMarker(place);
                });

                thisView.setState({
                    ...thisView.state,
                    places: data
                });
            });
    };

    onShowPlace = (place) => {
        this.centerMap(place.getLocation());
        this.zoomMap(15);
    };

    render() {
        const height = `${Math.max(window.innerHeight, 300)}px`;
        return (
            <div>
                <div style={{width: "300px", height: height, float: "left", backgroundColor: "#5b5b5b"}}>
                    <div style={{width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "10px", backgroundColor: "white"}}>

                        <Controls location={this.state.location}
                                  places={this.state.places}
                                  onSearch={this.onSearch}/>

                        <div style={{height: "calc(100% - 30px)", overflow: "scroll"}}>
                            {
                                this.state.places && <PlaceList places={this.state.places}
                                                                onShowPlace={this.onShowPlace}
                                                                center={this.state.location}
                                                                locationService={this.props.locationService}/>
                            }
                        </div>

                    </div>
                </div>
                <div style={{width: "calc(100% - 300px)", height: height, float: "right"}}>
                    <Map ref="map"/>
                </div>
            </div>
        );
    }
}

export default MainView;