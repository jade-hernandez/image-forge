# @repo/eslint-config

Shared ESLint configurations for the Financeclub monorepo. This package provides standardized linting rules for different types of projects and files within our ecosystem.

## Features

- Base configuration for TypeScript projects
- Next.js specific rules with architectural boundaries
- UI component library specific rules
- Test files configuration with Testing Library support
- API routes configuration with security rules
- Consistent code style across all projects
- Strict TypeScript checks
- Architectural boundaries enforcement
- Accessibility requirements

## Installation

This package is included by default in the monorepo. For manual installation:

```bash
pnpm add -D @repo/eslint-config
```

## Available Configurations

### Base Configuration

The foundation for all other configurations. Provides essential rules for TypeScript and general code quality.

```javascript
// .eslintrc.js
import baseConfig from "@repo/eslint-config/base";

export default baseConfig;
```

Key features:

- Strict TypeScript rules
- Naming conventions
- Import ordering
- Code quality metrics

#### Naming Conventions

```typescript
// ✅ Correct
interface IUserProfile { ... }
type TApiResponse = { ... }
enum EUserRole { ... }
const UserComponent = () => { ... }
const useCustomHook = () => { ... }
class UserService { ... }
abstract class AbstractRepository { ... }

// ❌ Incorrect
interface UserProfile { ... }      // Missing I prefix
type apiResponse = { ... }        // Missing T prefix and wrong case
enum userRole { ... }            // Missing E prefix and wrong case
const userComponent = () => { ... } // Wrong case for component
```

#### Import Ordering

ESLint's import ordering rules are disabled in favor of using Prettier's `@trivago/prettier-plugin-sort-imports` plugin for consistent import ordering across the monorepo.

**Related Configurations:**

- Import order is managed by [`@repo/prettier-config`](../prettier-config/README.md)
- Path aliases are configured in [`@repo/typescript-config`](../typescript-config/README.md)
- Component imports follow the architectural boundaries defined in this package

### Next.js Configuration

Extends base configuration with React and Next.js specific rules.

```javascript
// .eslintrc.js
import nextConfig from "@repo/eslint-config/next";

export default nextConfig;
```

#### Architectural Boundaries

```typescript
// ✅ Correct
// src/hooks/useUser.ts
import { userService } from "@/services/user";

// ❌ Incorrect
// src/components/UserCard.tsx
import { userService } from "@/services/user"; // Direct service import not allowed
```

#### Component Rules

```typescript
// ✅ Correct
const UserCard = ({ name, onEdit }: IUserCardProps) => {
  const handleClick = () => {
    onEdit(name);
  };

  return <div onClick={handleClick}>...</div>;
};

// ❌ Incorrect
function UserCard(props) { ... }  // Wrong component definition
const UserCard = (props) => {
  function onClick() { ... }  // Wrong handler naming
  return <div onClick={onClick}>...</div>;
};
```

### UI Configuration

Specific rules for UI component libraries.

```javascript
// .eslintrc.js
import uiConfig from "@repo/eslint-config/ui";

export default uiConfig;
```

#### Component Guidelines

```typescript
// ✅ Correct
const Button = ({ children, onClick }: IButtonProps) => (
  <button
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

// ❌ Incorrect
const Button = (props) => {
  const { children, onClick } = props;
  return <button onClick={onClick}>{children}</button>;
};
```

### Test Configuration

Rules optimized for test files using Vitest and Testing Library.

```javascript
// .eslintrc.js
import testConfig from "@repo/eslint-config/test";

export default testConfig;
```

#### Testing Best Practices

```typescript
// ✅ Correct
describe('UserComponent', () => {
  it('should show user details when loaded', async () => {
    render(<UserComponent />);

    await screen.findByText('User Details');
    expect(screen.getByRole('heading')).toHaveTextContent('John Doe');
  });
});

// ❌ Incorrect
test('user component', () => {
  const { container } = render(<UserComponent />);
  expect(container.querySelector('h1')).toHaveTextContent('John Doe');
});
```

### API Configuration

Enhanced security and type safety for API routes.

```javascript
// .eslintrc.js
import apiConfig from "@repo/eslint-config/api";

export default apiConfig;
```

#### API Guidelines

```typescript
// ✅ Correct
export async function handler(req: Request): Promise<Response> {
  try {
    const data = await validateInput(req.body);
    return new Response(JSON.stringify({ data }));
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
    throw error;
  }
}

// ❌ Incorrect
export default async (req, res) => {
  const data = req.body; // No type checking
  res.json({ data }); // No error handling
};
```

## Workspace Configuration

This package is configured to work with VSCode in a monorepo workspace setting. See the root `.vscode/settings.json` and `image-forge.code-workspace` for the complete workspace configuration.

When working in the monorepo:

- Format on save is enabled by default
- ESLint fixes are applied automatically
- Import sorting is handled by Prettier
- Files are excluded from formatting based on the shared configuration

## Code Quality Metrics

The configurations enforce various code quality metrics:

```typescript
// Maximum lines per function
"max-lines-per-function": [
  "warn",
  {
    max: 50,          // Regular functions
    max: 150,         // UI components
    max: 30,          // API routes
  }
]

// Complexity
"complexity": [
  "warn",
  10  // Regular functions
  5   // API routes
]

// Maximum nesting
"max-depth": ["error", 3]
```

## Best Practices

1. **File Organization**

   - Keep files focused and small
   - Group related functionality
   - Follow the established architectural boundaries

2. **Naming**

   - Use proper prefixes for interfaces (I), types (T), and enums (E)
   - Follow PascalCase for components and camelCase for functions
   - Use proper event handler naming (handle* for handlers, on* for props)

3. **Imports**

   - Use absolute imports (@/\*)
   - Follow the import ordering rules
   - Avoid circular dependencies

4. **Testing**

   - Use Testing Library queries effectively
   - Follow the AAA (Arrange-Act-Assert) pattern
   - Use proper assertions and matchers

5. **API Development**
   - Always validate input
   - Implement proper error handling
   - Follow security best practices

## Troubleshooting

1. **ESLint not detecting rules**

   - Check if the proper configuration is imported
   - Verify TypeScript project references
   - Check file extensions being processed

2. **Conflicts with Prettier**

- Import ordering is handled exclusively by Prettier
- ESLint's formatting rules are disabled to avoid conflicts
- The base configuration includes `eslint-config-prettier` to disable conflicting rules
- Import sorting is configured in `@repo/prettier-config`

3. **Performance Issues**
   - Use `.eslintignore` for build artifacts
   - Consider using `eslint-plugin-only-warn` in development
   - Configure proper file exclusions

## Contributing

1. All changes to ESLint configurations should be made in this package
2. Test changes across different project types
3. Update this README when adding new rules or configurations
4. Consider backwards compatibility

## License

ISC
