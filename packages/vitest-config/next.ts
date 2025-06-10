// next.ts
import { resolve } from 'path';

import { createVitestConfig } from './base.ts';

export function createNextVitestConfig(dirname: string) {
  return createVitestConfig(dirname, {
    setupFiles: [resolve(dirname, './src/test/setup.ts')],
    environment: 'jsdom',
    testMatch: [
      'src/**/*.test.{ts,tsx}',
      'src/**/*.spec.{ts,tsx}',
      '__tests__/**/*.test.{ts,tsx}',
      '__tests__/**/*.spec.{ts,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/playwright/**', 'e2e/**'],
  });
}
