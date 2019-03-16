class Location {

    /**
     * @param latitude {Number}
     * @param longitude {Number}
     */
    constructor({latitude, longitude}) {
        this._latitude = latitude;
        this._longitude = longitude;
    }

    /**
     * @return {Number}
     */
    getLatitude() {
        return this._latitude;
    }

    /**
     * @return {Number}
     */
    getLongitude() {
        return this._longitude;
    }
}

export default Location