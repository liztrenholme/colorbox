import React, { Component } from 'react'
import './colorbox.css'
import Display from '../display/index'
import Input from '../Input/index'

class Colorbox extends Component {
    state = {
      color: '#fff'
    }
    handleColorChange = (e) => {
      this.setState({ color: e.target.value })
    }
    render() {
      return (
        <div className="main">
          <Input color={this.state.color} 
            handleColorChange={this.handleColorChange} />
          <Display color={this.state.color} />
        </div>
      )
    }
}


export default Colorbox