import React, { Component } from 'react';
import './input.css';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    return (
      <div className="input">
        <input value={this.props.color} 
          onChange={this.props.handleColorChange} />
      </div>
    );
  }
}

Input.propTypes = {
  color: PropTypes.string,
  handleColorChange: PropTypes.func
};
  

export default Input;