/* eslint-disable no-undef */
// import React from 'react';
// import ReactDOM from 'react-dom';
import Colorbox from './index';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('mode is never undefined', () => {
  const mode = 'hex' || 'rgb' || 'colorName';
  expect(mode).not.toBeUndefined();
});

test('mode is never null', () => {
  const mode = 'hex' || 'rgb' || 'colorName';
  expect(mode).not.toBeNull();
});

test('color is not undefined', () => {
  const color = '#ffffff';
  expect(color).not.toBeUndefined();
});

// test('no part of the color string is NaN', () =>{
//   expect.not.stringContaining(NaN);
// });
console.log(Colorbox);
test('there is a new flavor idea', () => {
  expect(Colorbox.state).toBeDefined();
});

test('fake test', () => {
  const n = null;
  expect(n).toBeFalsy();
});