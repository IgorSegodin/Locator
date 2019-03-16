import PropTypes from 'prop-types';
import React from "react";
import AbstractInput from "ui/input/AbstractInput";

class TextInput extends AbstractInput {

    static propTypes = {
        ...AbstractInput.propTypes,
        placeholder: PropTypes.string
    };

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <input type="text"
                       ref="input"
                       name={this.props.name}
                       style={{width: "100%", height: "100%"}}
                       placeholder={this.props.placeholder || ""}/>
            </div>
        );
    }

    getValue() {
        return this.refs.input.value;
    }

}

export default TextInput;