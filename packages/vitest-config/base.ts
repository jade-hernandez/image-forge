// base.ts
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { type ViteUserConfig, defineConfig } from 'vitest/config';

export function createVitestConfig(
  dirname: string,
  options: {
    setupFiles?: string[];
    environment?: 'jsdom' | 'node' | 'happy-dom';
    testMatch?: string[];
    exclude?: string[];
  } = {}
): ViteUserConfig {
  const {
    setupFiles = [],
    environment = 'jsdom',
    testMatch = ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude = ['**/node_modules/**', '**/dist/**', '**/.next/**'],
  } = options;

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': resolve(dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment,
      setupFiles: ['@repo/vitest-config/setup', ...setupFiles],
      include: testMatch,
      exclude,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.test.{ts,tsx}',
          '**/*.spec.{ts,tsx}',
          '**/index.{ts,tsx}',
        ],
      },
      mockReset: true,
      restoreMocks: true,
      clearMocks: true,
      benchmark: {
        include: ['**/*.{bench,benchmark}.{ts,tsx}'],
        reporters: ['default', 'verbose'],
        outputFile: './bench-results.json',
      },
    },
  });
}
