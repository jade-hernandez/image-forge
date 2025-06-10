# @repo/typescript-config

Shared TypeScript configurations for the Financeclub monorepo. This package provides base
configurations for different types of projects within our ecosystem.

## Available Configurations

### Base Configuration (`base.json`)

Foundation configuration for all TypeScript projects in the monorepo.

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

Features:

- ES2022 target
- Strict type checking
- Decorator support
- Module resolution for bundlers
- Path aliases support
- Declaration file generation

### Next.js Configuration (`next.json`)

Optimized for Next.js applications with full type checking and path aliases.

```json
{
  "extends": "@repo/typescript-config/next.json"
}
```

Features:

- Next.js plugin support
- App directory support
- Optimized path aliases for Next.js structure
- JSX preservation
- Incremental compilation

### UI Library Configuration (`ui.json`)

Specific configuration for our shared UI components library.

```json
{
  "extends": "@repo/typescript-config/ui.json"
}
```

Features:

- React-specific JSX configuration
- Path aliases for component organization
- Bundler-optimized module resolution
- Library-specific build settings

### Test Configuration (`test.json`)

Configuration for test files with Vitest support.

```json
{
  "extends": "@repo/typescript-config/test.json"
}
```

Features:

- Vitest type definitions
- Testing Library type support
- Test-specific path aliases
- Coverage and mock configurations

## Implementation

### 1. Package Installation

Install in your project (already included in the monorepo):

```bash
pnpm add -D @repo/typescript-config
```

Add to your package.json:

```json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

### 2. Configuration Setup

The correct way to extend the configurations is by using the JSON files directly:

```json
{
  "extends": "@repo/typescript-config/next.json"
}
```

### 3. Configuration Files Structure

```
packages/typescript-config/
├── base.json          # Base configuration
├── next.json         # Next.js specific configuration
├── ui.json           # UI library configuration
└── test.json         # Testing configuration
```

Example base.json:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true
  }
}
```

Example next.json:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

## Best Practices

1. **Use JSON Configuration Files**

   - Always use `.json` files for TypeScript configurations
   - Do not use `.ts`, `.js`, or `.mjs` files for configs
   - Maintain proper JSON syntax and structure

2. **Path Aliases**

   - Configure paths based on your project structure
   - Use consistent alias patterns across projects
   - Match paths to your actual directory structure

3. **Project-Specific Settings**

   - Each project should have its own tsconfig.json
   - Extend the appropriate base configuration
   - Add project-specific settings as needed

4. **Dependency Management**
   - Use `workspace:*` for version specification
   - Keep TypeScript as a peer dependency
   - Maintain consistent versions across projects

## Common Issues and Solutions

1. **Path Resolution**

   - Ensure paths in tsconfig match your actual project structure
   - Use relative paths from the config file location
   - Consider your project's root directory

2. **Configuration Extension**

   - Use full filenames (e.g., `next.json` not `next`)
   - Reference JSON files directly
   - Maintain proper file extensions

3. **Module Resolution**
   - Use "bundler" for modern projects
   - Keep consistent settings across projects
   - Consider your build tools

## Integration with Other Packages

The TypeScript configurations are designed to work seamlessly with other monorepo packages:

- Linting rules from `@repo/eslint-config`
- Build settings from `@repo/ui`
- Testing configuration from `@repo/vitest-config`

## Contributing

1. Always use JSON for configurations
2. Test changes across different project types
3. Update documentation for significant changes
4. Consider backwards compatibility

## License

ISC
