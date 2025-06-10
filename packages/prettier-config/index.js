/** @type {import("prettier").Config} */
const config = {
  // Parentheses around arrow function parameters
  arrowParens: 'always',

  // Spacing and Brackets
  bracketSpacing: true,
  bracketSameLine: false,

  // Quotes
  jsxSingleQuote: true,
  singleQuote: true,

  // Line Endings and Width
  endOfLine: 'lf',
  printWidth: 100,

  // Formatting Rules
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: true,

  // Plugins and Import Sorting
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // Import Order Configuration
  importOrder: [
    // React and Next.js specific
    '^(react|react-dom)(.*)$',
    '^(next|next/.*)$',
    // Third party modules
    '<THIRD_PARTY_MODULES>',
    // Monorepo packages
    '^@repo/(.*)$',
    // App-specific imports
    '^@/__tests__',
    '^@/tests/(.*)$',
    '^@/application',
    '^@/di',
    '^@/infrastructure',
    '^@/interface-adapters',
    '^@/lib',
    '^@/entities',
    '^@/config/(.*)$',
    // '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/contexts/(.*)$',
    '^@/stores/(.*)$',
    '^@/providers/(.*)$',
    '^@/services/(.*)$',
    '^@/utils/(.*)$',
    // UI Components
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    // Types
    '^@/types/(.*)$',
    // Styles
    '^@/styles/(.*)$',
    // Relative imports
    '^[.]/types/(.*)$',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Markdown/Prose Settings
  proseWrap: 'preserve',

  // File-specific overrides
  overrides: [
    {
      files: '*.{yml,yaml,json}',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
};

export default config;
