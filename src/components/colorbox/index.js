import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';

class Colorbox extends Component {
    state = {
      color: '#fff',
      contrast: '#000',
      colorList: []
    }
    handleColorChange = (e) => {
      let { contrast } = this.state;
      
      this.setState({ color: e.target.value });

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
      const { colorList, color } = this.state;
      return (
        <div className="main">
          <h1 className='header' style={{color: '#808080'}}>Colorbox</h1>
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
                Drag or double-tap to remove an item from the list.
          </div>
        </div>
      );
    }
}


export default Colorbox;