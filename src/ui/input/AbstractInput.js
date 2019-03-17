import React from "react";
import PropTypes from 'prop-types';

class AbstractInput extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        // value: PropTypes.any,
        onChange: PropTypes.func,
        onKeyPress: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
}

export default AbstractInput;
