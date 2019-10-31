import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';

class Colorbox extends Component {
    state = {
      color: '#fff',
      colorList: []
    }
    handleColorChange = (e) => {
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
          <Input color={color}
            handleColorChange={this.handleColorChange}
          />
          <Display color={color} saveColor={this.saveColor} />
          <div className='chosenBox'>
            {colorList && colorList.length ? colorList.map(i => {
              return(<div className='colorItem' key={i}>
                <div style={{width: '1em', height: '1em', backgroundColor: i}} 
                  draggable onDrag={this.removeItem(i)} />
                <span>{i}</span>
                {/* <span onClick={this.removeItem(i)} 
                  value={i} style={{color: 'gray', marginLeft: '.3em'}}>x</span> */}
              </div>);
            }) : null}
          </div>
          <div className='instructions'>
                Drag chosen color to remove item from list.
          </div>
        </div>
      );
    }
}


export default Colorbox;