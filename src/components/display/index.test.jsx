import Display from './index';
import {test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

test('Display box renders', () => {
  render(<Display color='blue' />);
  expect(screen.queryByTestId('display-box-test')).toBeInTheDocument();
});