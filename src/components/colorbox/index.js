import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';
import { getContrastColor, hexCodes, colorNames, getSecondVal } from '../modules/index.js';

class Colorbox extends Component {
    state = {
      color: '#fff',
      contrast: '#000',
      colorList: [],
      mode: 'hex',
      error: ''
    }
    handleModeChange = (mode) => () => {
      this.setState({ mode, color: '', contrast: '', error: '' });
    }
    handleColorChange = (e) => {
      let { contrast } = this.state;
      let value = e.target.value;
      let mode = '';
      // const validated = this.validateColorName(value, this.state.mode);
      if (value.startsWith('#')) {
        mode = 'hex';
        contrast = getContrastColor(e.target.value);
      }
      if (value.startsWith('rgb')) {
        mode = 'rgb';
        contrast = '';
      }
      if (!value.startsWith('#') && !value.startsWith('rgb')) {
        mode = 'colorName';
        if (value && value.length) {
          const temp = colorNames[value];
          if (temp) {
            contrast = getContrastColor(temp);
            this.setState({contrast, error: ''});
          }
        }
      }
      if (value === '') {
        contrast = '';
      }
      this.setState({ color: value, contrast, mode, error: '' });
    }
    saveColor = () => {
      let list = this.state.colorList;
      const { color } = this.state;
      if (color.length > 3) {
        list.push(color);
      }
      this.setState({colorList: list, error: ''});
    }
    removeItem = (item) => () => {
      let list = this.state.colorList;
      list.splice(list.indexOf(item), 1);
      this.setState({colorList: list, error: ''});
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
      this.setState({ contrast: color, color: contrast, error: '' });
    }
    convertToHex = () => {
      const col = this.state.color;
      let color = '';
      if (this.state.mode === 'rgb') {
        let temp = col.split('(')[1];
        temp = temp.split(')')[0];
        temp = temp.split(',');
        temp = temp.map(i => Number(i));
        const R = temp[0]/16;
        const G = temp[1]/16;
        const B = temp[2]/16;
        const R1 = hexCodes[Math.floor(R)];
        const G1 = hexCodes[Math.floor(G)];
        const B1 = hexCodes[Math.floor(B)];
        const R2 = hexCodes[getSecondVal(R)];
        const G2 = hexCodes[getSecondVal(G)];
        const B2 = hexCodes[getSecondVal(B)];
        this.setState({color: `#${R1}${R2}${G1}${G2}${B1}${B2}`, mode: 'hex', error: ''});
        color = `#${R1}${R2}${G1}${G2}${B1}${B2}`;
      }
      if (this.state.mode === 'colorName') {
        this.setState({color: colorNames[col], mode: 'hex', error: ''});
        color = colorNames[col];
      }
      return color;
    }

    convertToRgb = () => {
      // const col = this.state.color;

    }

    convertToColorName = () => {
      const col = this.state.color;
      const hexToName = (color) => {
        let newColorName = '';
        const temp = Object.keys(colorNames).find(i => colorNames[i] === color);
        if (temp) {
          newColorName = temp;
        } else {
          this.setState({error: 'No CSS color name for this code.'});
        }
        this.setState({color: newColorName, mode: 'colorName'});
      };
      if (this.state.mode === 'hex') {
        hexToName(col);
      }
      if (this.state.mode === 'rgb') {
        const hexCol = this.convertToHex().toLowerCase();
        hexToName(hexCol);
      }
    }
    render() {
      const { colorList, color, contrast, mode, error } = this.state;
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
          <Input 
            color={color}
            handleColorChange={this.handleColorChange}
            mode={mode}
          />
          <div><h3 style={{color: 'darkRed'}}>{error}</h3></div>
          <Display color={color} />
          <div className='btnBox'>
            {color ?
              <button 
                className='swapBtn' 
                onClick={this.saveColor}>
                  Save
              </button> : null}
            {contrast ? 
              <button className='swapBtn' onClick={this.swapColors}>Swap</button> : null}
            {mode === 'hex' && color ? 
              <button className='swapBtn' onClick={this.convertToRgb}>Convert to RGB</button> : null}
            {(mode === 'rgb' && color) || (mode === 'colorName' && color) ? 
              <button className='swapBtn' onClick={this.convertToHex}>Convert to Hex</button> : null}
            {(mode === 'hex' && color) || (mode === 'rgb' && color) ? 
              <button className='swapBtn' onClick={this.convertToColorName}>Convert to Color Name</button> : null}
          </div>
          {contrast ?
            <div style={{display: 'flex', flexDirection: 'row', height: '1em'}}>
              <div style={{backgroundColor: contrast, width: '20px', height: '20px', marginRight: '0.5em'}} />
              <span style={{fontSize: '1.2em', fontWeight: 'bold'}}>Opposite: {contrast}</span>
            </div> : null}
         
          <div className='chosenBox'>
            {colorList && colorList.length ? colorList.map(i => {
              return(
                <div 
                  className='colorItem' 
                  key={i}
                  draggable 
                  onDrag={this.removeItem(i)}
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