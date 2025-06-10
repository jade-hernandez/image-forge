# @repo/prettier-config

Shared Prettier configuration for the Financeclub monorepo.

## Features

- Consistent code formatting across all projects
- Import sorting with `@trivago/prettier-plugin-sort-imports`
- Tailwind CSS class sorting with `prettier-plugin-tailwindcss`
- Project-specific file overrides for YAML, JSON, and Markdown
- Monorepo-aware import ordering

## Installation

This package is included by default in the monorepo. For manual installation:

```bash
pnpm add -D @repo/prettier-config
```

## Usage

### Configuration

In your project's `package.json`:

```json
{
  "prettier": "@repo/prettier-config"
}
```

Or in `.prettierrc.js`:

```javascript
import prettierConfig from "@repo/prettier-config";
export default prettierConfig;
```

### Key Features

#### Import Ordering

Imports are automatically sorted using `@trivago/prettier-plugin-sort-imports`. This configuration works in conjunction with other monorepo packages:

1. React and Next.js imports
2. Third-party modules
3. Monorepo packages (`@repo/*`)
4. App-specific imports:
   - Configuration
   - Libraries
   - Hooks
   - Contexts
   - Stores
   - Providers
   - Services
   - Utilities
5. UI Components
6. Types
7. Styles
8. Relative imports

**Related Configurations:**

- Path aliases are defined in [`@repo/typescript-config`](../typescript-config/README.md)
- Architectural boundaries for imports are enforced by [`@repo/eslint-config`](../eslint-config/README.md)
- Import paths should follow the structure defined in [`@repo/typescript-config`](../typescript-config/README.md)

#### File Type Overrides

- YAML/JSON files: Uses double quotes
- Markdown files: Wraps prose content

## ESLint Integration

This configuration is designed to work seamlessly with our ESLint setup:

- ESLint's import ordering rules are disabled
- ESLint handles code quality while Prettier handles formatting
- Import sorting is handled exclusively by Prettier's `@trivago/prettier-plugin-sort-imports`

## VS Code Integration

1. Install the Prettier extension
2. Add to your settings.json:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.addMissingImports.ts": "always",
    "source.fixAll.eslint": "explicit",
    "source.fixAll.format": "explicit"
  },
  "[typescript][javascript][typescriptreact][javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Workspace Configuration

This package is configured to work with VSCode in a monorepo workspace setting. See the root `.vscode/settings.json` and `image-forge.code-workspace` for the complete workspace configuration.

When working in the monorepo:

- Format on save is enabled by default
- ESLint fixes are applied automatically
- Import sorting is handled by Prettier
- Files are excluded from formatting based on the shared configuration

## Configuration Details

### Core Settings

```javascript
{
  arrowParens: "always",      // Include parentheses around single arrow function parameters
  bracketSpacing: true,       // Print spaces between brackets in object literals
  bracketSameLine: false,     // Put > of JSX elements on the next line
  jsxSingleQuote: true,       // Use single quotes in JSX
  singleQuote: true,          // Use single quotes for strings
  printWidth: 100,            // Line length where Prettier will try wrap
  trailingComma: "es5",       // Add trailing commas for better git diffs
  semi: true,                 // Add semicolons at the end of statements
}
```

### File Exclusions

The following files are ignored by default:

- Dependencies and build outputs:

  - `node_modules`
  - `.next`
  - `build`
  - `dist`
  - `.turbo`

- Testing files:

  - `coverage`
  - `__snapshots__`
  - `*.snap`

- Generated files:
  - `*.gen.*`
  - `*.generated.*`

## Contributing

1. All changes to the Prettier configuration should be made in this package
2. Test changes across different file types and projects
3. Update this README when adding new configuration options

## Troubleshooting

### Common Issues

1. **Imports not sorting correctly:**

   - Ensure `@trivago/prettier-plugin-sort-imports` is installed
   - Check if there are conflicts with ESLint import sorting rules

2. **Tailwind classes not sorting:**

   - Verify `prettier-plugin-tailwindcss` is installed
   - Ensure the file is recognized as a Tailwind CSS file

3. **VS Code not formatting on save:**
   - Check if Prettier is set as the default formatter
   - Verify the file type is not excluded in VS Code settings

### Getting Help

- Check the [Prettier documentation](https://prettier.io/docs/en/index.html)
- Review the monorepo's contributing guidelines
- Ask in the team's development channel
