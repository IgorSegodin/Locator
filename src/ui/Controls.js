import Location from 'data/Location';
import PropTypes from 'prop-types';
import React from "react";

import TextInput from 'ui/input/TextInput';

class Controls extends React.Component {

    static propTypes = {
        location: PropTypes.instanceOf(Location),
        onSearch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onSearch = () => {
        const value = this.refs.searchString.getValue();
        if (value && value.trim().length > 3) {
            this.props.onSearch(value);
        }
    };

    onEnter = ({key}) => {
        if (key === 'Enter') {
            this.onSearch();
        }
    };

    render() {
        return (
            <div>
                <div>
                    <div style={{display: "inline-block", width: "calc(100% - 50px)", height: "30px"}}>
                        <TextInput name="searchString" ref="searchString" placeholder="Search string ..." onKeyPress={this.onEnter}/>
                    </div>
                    <div style={{display: "inline-block", float: "right", width: "50px", height: "30px"}}>
                        <button onClick={this.onSearch} style={{width: "100%", height: "100%"}}>Find places</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Controls;