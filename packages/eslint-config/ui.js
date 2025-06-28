import js from '@eslint/js';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

export const config = [
  ...baseConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginA11y,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
    rules: {
      // React Hooks
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',

      // Component Rules
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
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

      // Performance Rules
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
        },
      ],
      'react/jsx-no-constructed-context-values': 'error',

      // Props Validation
      'react/require-default-props': [
        'error',
        {
          functions: 'defaultArguments',
        },
      ],

      // Pattern Rules
      // "react/jsx-handler-names": [
      //   "error",
      //   {
      //     eventHandlerPrefix: "handle",
      //     eventHandlerPropPrefix: "on",
      //     checkLocalVariables: true,
      //   },
      // ],

      // Accessibility Rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',

      // Import Rules
      'import/no-internal-modules': [
        'error',
        {
          allow: ['@/lib/*', '@/utils/*', '@/hooks/*'],
        },
      ],

      // Override some base rules for UI components
      'max-lines-per-function': [
        'warn',
        {
          max: 150,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // Performance optimization rules
      'react/memo-component-definition': ['error', { allowArrowFunctions: true }],
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
];
