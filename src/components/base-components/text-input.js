import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IBAN from 'iban';

import {deriveValidationText} from '../../helpers/base-component-helpers';

/**
`TextInput` component represent text-input
*/
class TextInput extends Component {
  /**
   @property {Object} props - Incoming react property
   @property {string | number} props.value - text-input value
   @property {string} props.label - input label text
   @property {string} props.placeholder - placeholder text
   @property {string} props.className - css style name
   @property {function} props.onChange - Event handler for change event
   @property {function} props.onBlur - Event handler for blur event
   @property {string} props.pattern - Input pattern eg.text, email, number or amount
   @property {validationText} props.validationText - validation text from parent component
   @constructor
   @returns {React.Element} - React component responsible for rendering inputbox
  */
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
	  placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    pattern: PropTypes.string,
    className: PropTypes.string,
    validationText: PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      isValid: true
    }
  }

  onChange = (event) => {
    this.setState({value: event.target.value, isValid: true});
    this.props.onChange(event, event.target.value);
  }

  onBlur = (event) => {
    let isValid = this.state.isValid;

    if (this.state.value && this.props.pattern === 'text') {
      isValid = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(event.target.value);
    }

    if (this.state.value && this.props.pattern === 'email') {
      const regux = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      isValid = regux.test(event.target.value);
    }

    if (this.state.value && this.props.pattern === 'IBAN') {
      isValid = IBAN.isValid(event.target.value);
    }

    this.setState({isValid});

    if (this.props.onBlur) {
      this.props.onBlur(event, isValid);
    }
  }

  render() {
    const validationText = this.props.validationText || deriveValidationText(this.props.pattern);

    return (
      <div className={this.props.className || 'l-form-control'}>
        {this.props.label && <div className="l-form-control-label">{this.props.label}</div>}
        <input 
          value={this.state.value} 
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder={this.props.placeholder}
        />
        {(this.props.validationText || !this.state.isValid) && <div className="l-form-control-validation-msg">{validationText}</div>}
      </div>
    );
  }
}

export default TextInput;
