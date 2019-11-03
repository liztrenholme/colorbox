import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';
import { getContrastColor } from '../modules/index.js';

class Colorbox extends Component {
    state = {
      color: '#fff',
      contrast: '#000',
      colorList: []
    }
    handleColorChange = (e) => {
      let { contrast } = this.state;
      contrast = getContrastColor(e.target.value);
      this.setState({ color: e.target.value, contrast });
    }
    saveColor = () => {
      let list = this.state.colorList;
      list.push(this.state.color);
      this.setState({colorList: list});
    }
    removeItem = (item) => () => {
      let list = this.state.colorList;
      list.splice(list.indexOf(item), 1);
      this.setState({colorList: list});
    }
    render() {
      const { colorList, color, contrast } = this.state;
      return (
        <div className="main">
          <h1 className='header' style={{color: contrast}}>Colorbox</h1>
          <Input color={color}
            handleColorChange={this.handleColorChange}
          />
          <Display color={color} saveColor={this.saveColor} />
          <div className='chosenBox'>
            {colorList && colorList.length ? colorList.map(i => {
              return(<div className='colorItem' key={i}
                draggable onDrag={this.removeItem(i)}
                onDoubleClick={this.removeItem(i)}>
                <div style={{width: '1em', height: '1em', backgroundColor: i}}  />
                <span>{i}</span>
              </div>);
            }) : null}
          </div>
          <div className='instructions'>
                Display the color associated with the hex code, rgb value, or CSS color name. 
                Drag or double-tap to remove an item from the list.  Try: rgb(180, 80, 180), 
                #4ba4ba or salmon.
          </div>
        </div>
      );
    }
}


export default Colorbox;