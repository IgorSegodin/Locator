import React from "react";
import ReactDOM from "react-dom";
import GeocodeService from 'service/GeocodeService';
import LocationService from 'service/LocationService';
import PlacesService from 'service/PlacesService';
import RestTemplate from 'service/RestTemplate';
import 'style.css';
import MainView from 'ui/MainView';

import ScriptLoader from 'util/ScriptLoader';

const scriptLoader = new ScriptLoader();
const locationService = new LocationService();
const restTemplate = new RestTemplate();

const configPromise = restTemplate.json("config.json");

const mapPromise = configPromise.then((config) => scriptLoader.load(`https://maps.googleapis.com/maps/api/js?libraries=places&key=${config.googleMapKey}`));

document.addEventListener("DOMContentLoaded", function () {
    mapPromise.then(() => {
        const geocodeService = new GeocodeService(google);
        const placesService = new PlacesService(google, document.createElement('div'));

        ReactDOM.render(<MainView locationService={locationService}
                                  geocodeService={geocodeService}
                                  placesService={placesService}/>, document.getElementById("app"));
    });
});