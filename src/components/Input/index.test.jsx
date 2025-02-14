import Input from './index';
import {describe, test, beforeEach, vi, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

test('color is not undefined', async () => {
  render(<Input color='purple' onChange={() => {}} />);
  const color = await screen.getByDisplayValue('purple');
  expect(color).toBeInTheDocument();
});
