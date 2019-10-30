import React, { Component } from 'react'
import './display.css'

class Display extends Component {
  render() {
    return (
      <div className='display'>
        <div style={{width: '20em', height: '10em', backgroundColor: this.props.color}} />
      </div>
    )
  }
}


export default Display