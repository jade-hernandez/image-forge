import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { nextJsConfig } from '@repo/eslint-config/next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...nextJsConfig,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
