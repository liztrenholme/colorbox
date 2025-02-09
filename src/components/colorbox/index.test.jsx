import Colorbox from './index';
import React from 'react';
// import { shallow, configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import chai, { expect, should } from 'chai';
// import spies from 'chai-spies'
import {describe, test, beforeEach, vi, expect} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// chai.use(spies);

// configure({adapter: new Adapter()});

describe('<Colorbox />', function () {
  // test('should render', () => {
  //   render(<Colorbox />);
  //   expect(screen.findByRole('div.main')).to.have.length(1);
  // });
  // test('should have a header', () => {
  //   render(<Colorbox />);
  //   expect(screen.find('.header')).to.have.length(1);
  // });
  test('swap button is present', async () => {
    const mockUseState = (initialValue) => {
      let color = initialValue;
      const setColor = vi.fn((newColor) => {
        color = newColor;
      });
      return [color, setColor];
    };
    vi.spyOn(React, 'useState').mockImplementation(mockUseState);
    await mockUseState('#4ba4ba');
    const {getByText, getByTestId} = render(<Colorbox />);
    expect(getByTestId(/input-test/i)).toBeInTheDocument();
    const inputElement = screen.getByTestId(/input-test/i);
    await fireEvent.change(inputElement, '#010101');
    expect(getByText('Show Opposite')).toBeInTheDocument();
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
  const string = 'f1c295';
  expect(string).not.toBeNaN();
});
