import Input from './index';
import props from './index';
import {describe, test, beforeEach, vi, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
// vi.mock('./index.js');

// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   Input.mockClear();
// });

test('color is not undefined', () => {
  render(<Input color='purple' />);
  const color = screen.queryByText('purple');
  expect(color).not.toBeUndefined();
});

// test('handleColorChange is not undefined', () => {
//   const handleColorChange = props.propTypes.handleColorChange.mock;
//   expect(handleColorChange).not.toBeUndefined();
// });