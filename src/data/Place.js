import Location from 'data/Location';

class Place {

    /**
     * @param name {String}
     * @param location {Location}
     */
    constructor({name, location}) {
        this._name = name;
        this._location = location;
    }

    /**
     * @return {String}
     */
    getName() {
        return this._name;
    }

    /**
     * @return {Location}
     */
    getLocation() {
        return this._location;
    }
}

export default Place