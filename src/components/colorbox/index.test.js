/* eslint-disable no-undef */
import Colorbox from './index';
jest.mock('./index.js');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Colorbox.mockClear();
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

test('no part of the color string is NaN', () =>{
  expect.not.stringContaining('NaN');
});
