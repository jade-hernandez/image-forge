import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';

export const config = [
  js.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint,
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Remove rules that conflict with Prettier
      'max-len': 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'arrow-parens': 'off',

      // Turbo
      'turbo/no-undeclared-env-vars': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          typedefs: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        // Interfaces, Types, and Enums
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E'],
        },
        // Classes and Abstract Classes
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          modifiers: ['abstract'],
          format: ['PascalCase'],
          prefix: ['Abstract'],
        },
        // Variables and Functions
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // React Components and Hooks
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['function'],
          format: ['PascalCase'],
          prefix: ['use'],
          filter: {
            regex: '^use[A-Z]',
            match: true,
          },
        },
        // Constants
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase'],
        },
        // Properties
        {
          selector: 'property',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // Method
        {
          selector: 'method',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Private members
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        // Parameters
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // Generics
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          prefix: ['T'],
        },
      ],

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['..*'],
              message: 'Please use absolute imports instead (e.g., @/components/, @/lib/)',
            },
          ],
        },
      ],

      // TypeScript Strict Rules
      // Todo - This is too strict for now
      // '@typescript-eslint/strict-boolean-expressions': [
      //   'error',
      //   {
      //     allowString: false,
      //     allowNumber: false,
      //     allowNullableObject: false,
      //   },
      // ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Code Quality
      // Todo: Add fine-grained control for these rules - dissociate react from typescript code
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ['warn', 10],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],

      // Error Prevention
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
        },
      },
    },
  },
  {
    files: ['!dist/**'],
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-nested-callbacks': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
