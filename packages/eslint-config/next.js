import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginBoundaries from 'eslint-plugin-boundaries';
// import pluginA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { config as baseConfig } from './base.js';

export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      boundaries: pluginBoundaries,
      // 'jsx-a11y': pluginA11y, // Todo - When uncommented, we have a definition error
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'app/**/*',
        },
        {
          type: 'pages',
          pattern: 'pages/**/*',
        },
        {
          type: 'components',
          pattern: 'src/components/**/*',
        },
        {
          type: 'hooks',
          pattern: 'src/hooks/**/*',
        },
        {
          type: 'lib',
          pattern: 'src/lib/**/*',
        },
        {
          type: 'utils',
          pattern: 'src/utils/**/*',
        },
        {
          type: 'types',
          pattern: 'src/types/**/*',
        },
        {
          type: 'services',
          pattern: 'src/services/**/*',
        },
        {
          type: 'stores',
          pattern: 'src/stores/**/*',
        },
        {
          type: 'configs',
          pattern: 'src/config/**/*',
        },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
    rules: {
      // Boundaries
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: 'app',
              disallow: ['app'],
              message: 'App pages cannot import from other app pages',
            },
            {
              from: 'components',
              disallow: ['app', 'pages', 'services', 'stores'],
              message: 'Components should not directly import from app, pages, services, or stores',
            },
            {
              from: 'hooks',
              allow: ['services', 'stores', 'utils', 'lib'],
              message: 'Hooks can only import from services, stores, utils, and lib',
            },
            {
              from: 'services',
              disallow: ['components', 'hooks', 'app', 'pages'],
              message: 'Services cannot import from UI layer',
            },
            {
              from: 'app/api',
              allow: ['lib', 'services', 'utils'],
              message: 'API routes should only import from lib, services, and utils',
            },
          ],
        },
      ],

      // React
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      'react/jsx-no-constructed-context-values': 'error',
      // 'react/jsx-handler-names': [
      //   'error',
      //   {
      //     eventHandlerPrefix: 'handle',
      //     eventHandlerPropPrefix: 'on',
      //     checkLocalVariables: true,
      //   },
      // ],

      // Override the function naming to allow PascalCase for components
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],

      // Increase max lines limit for React components
      'max-lines-per-function': [
        'warn',
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // Accessibility Rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',

      // Next.js
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/google-font-preconnect': 'error',
      '@next/next/no-page-custom-font': 'error',
      '@next/next/no-css-tags': 'error',
      '@next/next/no-styled-jsx-in-document': 'error',
      '@next/next/no-script-component-in-head': 'error',
      '@next/next/no-duplicate-head': 'error',
      '@next/next/no-before-interactive-script-outside-document': 'error',
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: '.',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // Override rules for specific patterns
  {
    files: ['**/pages/**/*.tsx', '**/app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
    ],
  },
];
