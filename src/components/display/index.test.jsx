import Display from './index';
import {describe, test, beforeEach, vi, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

test('Display box renders', () => {
  render(<Display color='blue' />);
  // eslint-disable-next-line no-console
  console.log('screen?', screen);
  expect(screen.queryByTestId('display-box-test')).toBeInTheDocument();
});