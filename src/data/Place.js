import Location from 'data/Location';

class Place {

    /**
     * @param name {String}
     * @param address {String}
     * @param location {Location}
     */
    constructor({name, address, location}) {
        this._name = name;
        this._address = address;
        this._location = location;
    }

    /**
     * @return {String}
     */
    getName() {
        return this._name;
    }

    /**
     * @return {String}
     */
    getAddress() {
        return this._address;
    }

    /**
     * @return {Location}
     */
    getLocation() {
        return this._location;
    }
}

export default Place