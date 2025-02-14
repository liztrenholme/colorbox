import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// FAIL LOUDLY on unhandled promise rejections / errors
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.log('FAILED TO HANDLE PROMISE REJECTION');
  throw reason;
});