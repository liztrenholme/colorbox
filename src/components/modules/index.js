export const getContrastColor = (color) => {
  let contrast = '';
  if (color.startsWith('#')) {
    let temp = color.split('');
    temp.shift();
    contrast = temp.map(i => i = swap(i));
    contrast = `#${contrast.join('')}`;
  }
  else if (color.startsWith('RGB') || color.startsWith('rgb')) {
    // console.log('rgb!');
  }
  else {
    // console.log('nope');
  }
  return contrast;
};

export const swap = (i) => {
  switch(i) {
  case '0':
    i = 'F';
    break;
  case '1':
    i = 'E';
    break;
  case '2':
    i = 'D';
    break;
  case '3':
    i = 'C';
    break;
  case '4':
    i = 'B';
    break;
  case '5':
    i = 'A';
    break;
  case '6':
    i = '9';
    break;
  case '7':
    i = '8';
    break;
  case '8':
    i = '7';
    break;
  case '9':
    i = '6';
    break;
  case 'A':
    i = '5';
    break;
  case 'B':
    i = '4';
    break;
  case 'C':
    i = '3';
    break;
  case 'D':
    i = '2';
    break;
  case 'E':
    i = '1';
    break;
  case 'F':
    i = '0';
    break;
  default:
    i = '0';
  }
  return i;
};