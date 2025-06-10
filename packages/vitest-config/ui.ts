import { resolve } from 'path';

import { createVitestConfig } from './base.ts';

export function createUIVitestConfig(dirname: string) {
  return createVitestConfig(dirname, {
    setupFiles: [resolve(dirname, './src/test/setup.ts')],
    environment: 'jsdom',
    testMatch: [
      'src/components/**/*.test.{ts,tsx}',
      'src/components/**/*.spec.{ts,tsx}',
      'src/hooks/**/*.test.{ts,tsx}',
      'src/hooks/**/*.spec.{ts,tsx}',
    ],
  });
}
