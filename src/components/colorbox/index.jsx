/* eslint-disable no-console */
import React, { useState } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';
import InfoIconCircle from './assets/infoicon.png';
import { 
  getContrastColor, 
  hexCodes, 
  colorNames, 
  getSecondVal, 
  rgbVals } from '../modules/index.js';
import json from '../../../package.json';

const Colorbox = () => {
  const [color, setColor] = useState('#ffffff');
  const [contrast, setContrast] = useState('#000000');
  const [colorList, setColorList] = useState([]);
  const [mode, setMode] = useState('hex');
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleColorChange = (e) => {
    let value = e.target.value;
    setColorInState(value);
  };

  const setColorInState = (newColor) => {
    let newContrast = contrast;
    let newMode = '';
    if (newColor && newColor.startsWith('#')) {
      newMode = 'hex';
      newContrast = getContrastColor(newColor);
    }
    if (newColor && newColor.startsWith('rgb')) {
      newMode = 'rgb';
      newContrast = getContrastColor(newColor);
    }
    if (newColor && !newColor.startsWith('#') && !newColor.startsWith('rgb')) {
      newMode = 'colorName';
      if (newColor && newColor.length) {
        const temp = colorNames[newColor];
        if (temp) {
          newContrast = getContrastColor(temp);
          // this.setState({contrast, error: ''});
          setContrast(newContrast);
          setError('');
        }
      }
    }
    if (!newColor) {
      newContrast = '';
    }
    if (newColor === '') {
      newContrast = '';
    }
    setContrast(newContrast);
    setColor(newColor);
    setMode(newMode);
    setError('');
  };

  const chooseColor = (item) => () => {
    setColorInState(item);
  };

  const saveColor = () => {
    setColorList([...colorList, color]);
    setError('');
  };

  const removeItem = (item) => () => {
    let list = [...colorList];
    list.splice(list.indexOf(item), 1);
    setColorList(list);
    setError('');
  };

  const swapColors = () => {
    let newMode = mode;
    if (contrast.startsWith('#')) {
      newMode = 'hex';
    }
    /* v8 ignore start */
    if (!contrast.startsWith('#') && !contrast.startsWith('rgb(')) {
      newMode = 'colorName';
      /* v8 ignore end */
    }
    setContrast(color);
    setColor(contrast);
    setMode(newMode);
    setError('');
  };

  const convertToHex = () => {
    const col = color;
    let newColor = '';
    if (col && mode === 'rgb') {
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
      const newContrast = getContrastColor(`#${R1}${R2}${G1}${G2}${B1}${B2}`);
      // this.setState({
      //   color: `#${R1}${R2}${G1}${G2}${B1}${B2}`, 
      //   mode: 'hex', 
      //   contrast, 
      //   error: ''
      // });
      newColor = `#${R1}${R2}${G1}${G2}${B1}${B2}`;
      setColor(newColor);
      setMode('hex');
      setContrast(newContrast);
      setError('');
    }
    if (col && mode === 'colorName') {
      const name = col.toLowerCase();
      const newContrast = getContrastColor(colorNames[name]);
      // this.setState({color: colorNames[name], mode: 'hex', contrast, error: ''});
      setColor(colorNames[name]);
      setMode('hex');
      setContrast(newContrast);
      setError('');
      newColor = colorNames[name];
    }
    return newColor;
  };

  const convertToRgb = () => {
    const col = color;
    let newError = '';
    const getValsFromHex = (vals = '') => {
      let temp = vals.toUpperCase();
      temp = temp.split('');
      const val1 = (rgbVals[temp[1]] * 16) + (rgbVals[temp[2]]);
      const val2 = (rgbVals[temp[3]] * 16) + (rgbVals[temp[4]]);
      const val3 = (rgbVals[temp[5]] * 16) + (rgbVals[temp[6]]);
      return `rgb(${val1}, ${val2}, ${val3})`;
    };
    if (mode === 'hex') {
      if (col.length === 7) {
        const newColor = getValsFromHex(col);
        setColor(newColor);
        setMode('rgb');
        setError('');
      } else {
        newError = 'Hex must have 6 characters';
        setError(newError);
      }
    }
    if (mode === 'colorName') {
      const name = col.toLowerCase();
      let newColor = getValsFromHex(colorNames[name]);
      if (col.includes('NaN')) {
        newColor = col;
        newError = 'Not a valid color';
      }
      setColor(newColor);
      setError(newError);
      setMode('rgb');
    }
  };

  const convertToColorName = () => {
    const col = color;
    const hexToName = (c = '') => {
      let newColorName = '';
      const temp = Object.keys(colorNames).find(i => colorNames[i] === c.toLowerCase());
      if (temp) {
        newColorName = temp;
        setColor(newColorName);
        setMode('colorName');
      } else {
        setError('No CSS color name for this code.');
      }
    };
    if (mode === 'hex') {
      hexToName(col);
    }
    if (mode === 'rgb') {
      const hexCol = convertToHex().toLowerCase();
      hexToName(hexCol);
    }
  };

  const getColorOptions = () => Object.keys(colorNames).map(i => {
    return (
      <option data-testid="select-option" key={`${colorNames[i]}${i}`} value={i}>
        {i}
      </option>
    );
  });

  const handleShowMobileInstructions = () => {
    showInstructions 
      ? setShowInstructions(false) 
      : setShowInstructions(true);
  };

  const populateColor = (color) => {
    setColorInState(color);
  };
  return (
    <div className="main">
      <h1 className='header' style={{color: contrast}}>Colorbox</h1>
      <div className='infoIcon'>
        <img
          data-testid='info-circle-test'
          src={InfoIconCircle} 
          onClick={handleShowMobileInstructions}
          width='20px'
          height='20px'
          alt='info-icon' />
      </div>
      {showInstructions ? 
        <div className='mobileInstructions'>
          <div>
            <p>
            Display the color associated with the hex code, rgb value, or CSS color name typed into 
            the input, or select a color name from the dropdown. Try: <span onClick={() => populateColor('rgb(180, 80, 180)')}><strong>rgb(180, 80, 180)</strong></span>, 
              <span onClick={() => populateColor('#4ba4ba')}> <strong>#4ba4ba</strong></span> or <span data-testid='salmon-test' onClick={() => populateColor('salmon')}><strong>salmon</strong></span>.
            </p>
            <p>
            Swap to view contrasting color, convert color code to hex, rgb value or color 
            name (if applicable), tap/click saved color to view again, double click/tap or 
            drag to remove saved color.
            </p>
          </div>
        </div> : null}
      <div className='buttonBox'>
        <button data-testid='hex-btn-test' onClick={convertToHex} 
          className={mode === 'hex' ? 'active' : 'inactive'}>
                  Hex
        </button>
        <button onClick={convertToRgb} 
          className={mode === 'rgb' ? 'active' : 'inactive'}>
                  RGB
        </button>
        <button data-testid='col-name-btn-test' onClick={convertToColorName} 
          className={mode === 'colorName' ? 'active' : 'inactive'}>
                  Color Name
        </button>
      </div>
      <div className='inputWithSave'>
        <Input 
          color={color}
          handleColorChange={handleColorChange}
          mode={mode}
        />
        {color ?
          <button 
            className='saveBtn' 
            onClick={saveColor}>
                  Add to List
          </button> : null}
      </div>
      <div>
        <h3 style={{color: 'darkRed'}}>{error}</h3>
      </div>
      <Display color={color} />
      <div className='btnBox'>
        {contrast ? 
          <button className='swapBtn' onClick={swapColors}>Show Opposite</button> : null}
        <select
          data-testid="select"
          value={color}
          className='colorSelect' 
          onChange={handleColorChange}>
          <option value=''>Choose color...</option>
          {getColorOptions()}
        </select>
      </div>
      {contrast ?
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          height: '1em'
        }}>
          <div style={{
            backgroundColor: contrast, 
            width: '20px', 
            height: '20px',
            marginRight: '0.5em',
            borderRadius: '5px'
          }} />
          <span style={{
            fontSize: '1.2em', 
            fontWeight: 'bold'
          }}>Opposite: {contrast}</span>
        </div> : null}
         
      <div className='chosenBox'>
        {colorList && colorList.length ? colorList.map(i => {
          return(
            <div 
              data-testid='saved-color-item-test'
              className='colorItem' 
              key={i}
              draggable 
              onClick={chooseColor(i)}
              onDrag={removeItem(i)}
              onDoubleClick={removeItem(i)}>
              <div style={{
                width: '2em', 
                height: '2em', 
                backgroundColor: i,
                borderRadius: '8px'
              }}  />
              <span data-testid='saved-colorname-test' className='colorName'>{i}</span>
            </div>);
        }) : null}
      </div>
      <div className='instructions'>
        <div>
          <p>
            Display the color associated with the hex code, rgb value, or CSS color name typed into 
            the input, or select a color name from the dropdown. Try: <span onClick={() => populateColor('rgb(180, 80, 180)')}><strong>rgb(180, 80, 180)</strong></span>, 
            <span onClick={() => populateColor('#4ba4ba')}> <strong>#4ba4ba</strong></span> or <span onClick={() => populateColor('salmon')}><strong>salmon</strong></span>.
          </p>
          <p>
            Swap to view contrasting color, convert color code to hex, rgb value or color 
            name (if applicable), tap/click saved color to view again, double click/tap or 
            drag to remove saved color.
          </p>
        </div>
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
};


export default Colorbox;