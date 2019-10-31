import React, { Component } from 'react';
import './input.css';

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


export default Input;