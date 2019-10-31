import React, { Component } from 'react';
import './display.css';
import PropTypes from 'prop-types';

class Display extends Component {
    state = {
      buttonVisible: false
    }
    showButton = () => this.setState({buttonVisible: true})
    hideButton = () => this.setState({buttonVisible: false})
    render() {
      return (
        <div className='display'>
          <div style={{width: '20em', height: '10em', backgroundColor: this.props.color}} 
            onMouseOver={this.showButton}
          />
          {this.state.buttonVisible 
            ? <button className='btn' 
              onClick={this.props.saveColor}>
                  Save
            </button> : null}
        </div>
      );
    }
}

Display.propTypes = {
  color: PropTypes.string,
  saveColor: PropTypes.func
};

export default Display;