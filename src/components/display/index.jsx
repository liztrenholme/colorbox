import React from 'react';
import './display.css';
import PropTypes from 'prop-types';

const Display = (props) => {
  return (
    <div className='display' data-testid="display-box-test">
      <div style={{
        width: '20em', 
        height: '10em', 
        backgroundColor: props.color, 
        border: '5px solid #fff',
        borderRadius: '15px'
      }}
      />
    </div>
  );
};

Display.propTypes = {
  color: PropTypes.string
};

export default Display;