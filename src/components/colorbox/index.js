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
      this.setState({ mode, color: '', contrast: '' });
    }
    handleColorChange = (e) => {
      let { contrast } = this.state;
      let value = e.target.value;
      let mode = '';
      // const validated = this.validateColorName(value, this.state.mode);
      if (value.startsWith('#')) {
        mode = 'hex';
      }
      if (value.startsWith('rgb')) {
        mode = 'rgb';
        contrast = '';
      }
      if (!value.startsWith('#') && !value.startsWith('rgb')) {
        mode = 'colorName';
        contrast = '';
      }
      contrast = getContrastColor(e.target.value);
      this.setState({ color: value, contrast, mode });
    }
    saveColor = () => {
      let list = this.state.colorList;
      const { color } = this.state;
      if (color.length > 3) {
        list.push(color);
      }
      this.setState({colorList: list});
    }
    removeItem = (item) => () => {
      let list = this.state.colorList;
      list.splice(list.indexOf(item), 1);
      this.setState({colorList: list});
    }
    validateColorName = (name, mode) => {
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
      return valid;
    }
    swapColors = () => {
      const { contrast, color } = this.state;
      this.setState({ contrast: color, color: contrast });
    }
    convertToHex = () => {
      const col =  this.state.color; // 'rgb(220,20,60)';
      // console.log(col.split('(')[1]);
      let temp = col.split('(')[1];
      temp = temp.split(')')[0];
      temp = temp.split(',');
      temp = temp.map(i => Number(i));
      // temp = temp.split(',').filter(i => i !== ')').join(',');
      console.log(temp, 'hi');
      const R = temp[0]/16;
      console.log(R);

    }
    convertToRgb = () => {

    }
    render() {
      const { colorList, color, contrast, mode } = this.state;
      return (
        <div className="main">
          <h1 className='header' style={{color: contrast}}>Colorbox</h1>
          <div className='buttonBox'>
            <button onClick={this.handleModeChange('hex')} 
              className={mode === 'hex' ? 'active' : 'inactive'}>
                  Hex
            </button>
            <button onClick={this.handleModeChange('rgb')} 
              className={mode === 'rgb' ? 'active' : 'inactive'}>
                  RGB
            </button>
            <button onClick={this.handleModeChange('colorName')} 
              className={mode === 'colorName' ? 'active' : 'inactive'}>
                  Color Name
            </button>
          </div>
          <Input color={color}
            handleColorChange={this.handleColorChange}
            mode={mode}
          />
          <Display color={color} />
          <div className='btnBox'>
            {color ?
              <button className='swapBtn' 
                onClick={this.saveColor}>
                  Save
              </button> : null}
            {contrast ? 
              <button className='swapBtn' onClick={this.swapColors}>Swap</button> : null}
            {mode === 'hex' && color ? 
              <button className='swapBtn' onClick={this.convertToRgb}>Convert to RGB</button> : null}
            {mode === 'rgb' && color ? 
              <button className='swapBtn' onClick={this.convertToHex}>Convert to Hex</button> : null}
          </div>
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