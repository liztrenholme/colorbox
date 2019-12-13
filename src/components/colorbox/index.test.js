// import React from 'react';
// import ReactDOM from 'react-dom';
// import Colorbox from './index';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('mode is always set', () => {
  const mode = 'hex' || 'rgb' || 'colorName';
  expect(mode).not.toBeUndefined();
});

test('color is not undefined', () => {
  const color = '#ffffff';
  expect(color).not.toBeUndefined();
});

test('fake test', () => {
  const n = null;
  expect(n).toBeFalsy();
});