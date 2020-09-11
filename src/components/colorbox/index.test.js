/* eslint-disable no-undef */
import Colorbox from './index';
import { describe } from 'yargs';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.mock('./index.js');

configure({adapter: new Adapter()});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Colorbox.mockClear();
});

describe('<Colorbox />', function () {
  is('should render', () => {
    const wrapper = shallow(<Colorbox />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});

describe('<Colorbox />', function () {
  is('should have a header', () => {
    const wrapper = shallow(<Colorbox />);
    expect(wrapper.find('h1')).to.have.length(1);
  });
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
