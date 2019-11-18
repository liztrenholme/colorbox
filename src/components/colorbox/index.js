import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';
import { getContrastColor } from '../modules/index.js';

class Colorbox extends Component {
    state = {
      color: '#fff',
      contrast: '#000',
      colorList: [],
      mode: ''
    }
    handleModeChange = (mode) => () => {
      this.setState({ mode });
    }
    handleColorChange = (e) => {
      let { contrast } = this.state;
      let value = e.target.value;
      const validated = this.validateColorName(value, this.state.mode);
      console.log(validated);
      contrast = getContrastColor(e.target.value);
      this.setState({ color: value, contrast });
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
    validateColorName = (name, mode) => {
      console.log(name, mode);
      let valid = name;
      if (mode === 'hex') {
        valid = `#${name}`;
        valid.split('').filter(function(i, a, self) {
          return self.indexOf(i) === '#';
        })
          .join('');
      }
      if (mode === 'rgb') {
        return valid
          .split('')
          .filter(function(item, a, self) {
            return self.indexOf(item) === '#';
          })
          .join('');
      }
      // console.log(name, valid);
      return valid;
    }
    render() {
      const { colorList, color, contrast, mode } = this.state;
      console.log(mode);
      return (
        <div className="main">
          <h1 className='header' style={{color: contrast}}>Colorbox</h1>
          <div className='buttonBox'>
            <button onClick={this.handleModeChange('hex')} 
              className={mode === 'hex' || color.startsWith('#') ? 'active' : mode === '' ? 'inactive' : 'inactive'}>
                  Hex
            </button>
            <button onClick={this.handleModeChange('rgb')} 
              className={mode === 'rgb' || color.startsWith('rgb(') || color.startsWith('RGB(') ? 'active' : mode === '' ? 'inactive' : 'inactive'}>
                  RGB
            </button>
            <button onClick={this.handleModeChange('colorName')} 
              className={mode === 'colorName' || (!color.startsWith('#') 
              && !color.startsWith('rgb(') && !color.startsWith('RGB(')) ? 'active' : 'inactive'}>
                  Color Name
            </button>
          </div>
          <Input color={color}
            handleColorChange={this.handleColorChange}
            mode={mode}
          />
          <Display color={color} saveColor={this.saveColor} />
          {contrast ?
            <div style={{display: 'flex', flexDirection: 'row', height: '1em'}}>
              <div style={{backgroundColor: contrast, width: '20px', height: '20px', marginRight: '0.5em'}} />
              <span style={{fontSize: '1.2em', fontWeight: 'bold'}}>Opposite: {contrast}</span>
            </div> : null}
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