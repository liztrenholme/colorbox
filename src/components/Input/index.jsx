import React from 'react';
import './input.css';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { color, handleColorChange } = props;
  return (
    <div className="input" data-testid="input-test">
      <input 
        data-testid='actual-input' 
        value={color} 
        onChange={handleColorChange} />
    </div>
  );
};

Input.propTypes = {
  color: PropTypes.string,
  handleColorChange: PropTypes.func,
  mode: PropTypes.string
};
  

export default Input;