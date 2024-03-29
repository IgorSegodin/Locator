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
                       onKeyPress={(e) => {
                           if (this.props.onKeyPress) {
                               this.props.onKeyPress({
                                   name: this.props.name,
                                   key: e.key
                               });
                           }
                       }}
                       onChange={(e) => {
                           if (this.props.onChange) {
                               this.props.onChange({
                                   name: this.props.name,
                                   value: e.target.value
                               });
                           }
                       }}
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