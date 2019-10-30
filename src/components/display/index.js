import React, { Component } from 'react'

class Display extends Component {
  render() {
    return (
      <div style={{width: '20em', height: '10em', backgroundColor: this.props.color}} />
    )
  }
}


export default Display