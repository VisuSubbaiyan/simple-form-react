import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
  `Button` component represents simple button
  @param {Object} props - Incoming react property
  @param {string} props.className - additional classes for button
  @param {function} props.onClick - Event handler for click event
  @param {string} props.label - Text has to be displayed
  @param {string} props.value - button value
  @param {boolean} props.disabled - define that button is disabled or enabled
  @constructor
  @returns {React.Element} - React component responsible for rendering simple button  
*/
const Button = ({className, onClick, label, value, disabled}) => {
  const buttonClassName = `form-button ${className}`;
  
  return (
    <button disabled={disabled} className={buttonClassName} value={value} onClick={onClick} >
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
