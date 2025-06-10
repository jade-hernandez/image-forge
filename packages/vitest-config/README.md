# @repo/vitest-config

Shared Vitest configurations for the Financeclub monorepo. This package provides standardized test setups for different project types within our ecosystem.

## Features

- Unified test configuration across all projects
- Pre-configured environments for different project types
- Common test utilities and matchers
- Consistent coverage reporting
- Shared mocking strategies
- TypeScript and path alias support

## Installation

```bash
pnpm add -D @repo/vitest-config
```

## Usage

### Next.js Applications

```typescript
// vitest.config.ts
import { createNextVitestConfig } from "@repo/vitest-config/next";
import { defineConfig } from "vitest/config";

export default defineConfig(createNextVitestConfig(__dirname));
```

### UI Components

```typescript
// vitest.config.ts
import { createUIVitestConfig } from "@repo/vitest-config/ui";
import { defineConfig } from "vitest/config";

export default defineConfig(createUIVitestConfig(__dirname));
```

### Custom Configuration

```typescript
// vitest.config.ts
import { createVitestConfig } from "@repo/vitest-config/base";
import { defineConfig } from "vitest/config";

export default defineConfig(
  createVitestConfig(__dirname, {
    setupFiles: ["./src/test/setup.ts"],
    environment: "jsdom",
    testMatch: ["src/**/*.test.{ts,tsx}"],
  })
);
```

## Configuration Options

### Base Configuration

```typescript
interface ConfigOptions {
  setupFiles?: string[]; // Additional setup files
  environment?: "jsdom" | "node"; // Test environment
  testMatch?: string[]; // Test file patterns
  exclude?: string[]; // Files to exclude
}
```

Default settings:

- JSDOM environment
- React support
- TypeScript path aliases
- V8 coverage provider
- Automatic mock resets
- Testing Library integration

### Next.js Configuration

Additional features:

- Next.js specific file patterns
- E2E test exclusion
- App directory support
- Server component testing setup

### UI Configuration

Specialized for:

- Component testing
- Hook testing
- Style testing
- Accessibility testing

## Test Setup

The package includes a base setup file that:

- Extends Jest DOM matchers
- Sets up cleanup after each test
- Mocks browser APIs (IntersectionObserver, matchMedia)
- Provides error tracking for console.error

## Writing Tests

### Testing Guidelines

Our testing approach follows the AAA (Arrange-Act-Assert) pattern to ensure clear and maintainable tests.

```typescript
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('UserProfile', () => {
  it('displays user information when data is loaded', async () => {
    // Arrange: Set up test data and conditions
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin'
    }

    // Act: Perform the action being tested
    render(<UserProfile user={userData} />)

    // Assert: Verify the expected outcome
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })
})
```

#### Key Principles

1. **Arrange**

   - Set up test data
   - Mock dependencies
   - Initialize components

   ```typescript
   const mockData = { items: ["item1", "item2"] };
   const mockFetch = vi.fn().mockResolvedValue(mockData);
   vi.mock("@/lib/api", () => ({ fetchItems: mockFetch }));
   ```

2. **Act**

   - Execute the code being tested
   - Trigger events

   ```typescript
   render(<ItemList />)
   await userEvent.click(screen.getByText('Load Items'))
   ```

3. **Assert**
   - Verify the expected outcomes
   ```typescript
   expect(mockFetch).toHaveBeenCalledTimes(1);
   expect(screen.getByText("item1")).toBeInTheDocument();
   ```

### Component Testing

```typescript
describe('Button', () => {
  it('calls onClick handler when clicked', async () => {
    // Arrange
    const handleClick = vi.fn()

    // Act
    render(<Button onClick={handleClick}>Click Me</Button>)
    await userEvent.click(screen.getByText('Click Me'))

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Hook Testing

```typescript
describe("useForm", () => {
  it("updates form values correctly", () => {
    // Arrange
    const initialValues = { name: "" };

    // Act
    const { result } = renderHook(() => useForm(initialValues));
    act(() => {
      result.current.updateField("name", "John");
    });

    // Assert
    expect(result.current.values.name).toBe("John");
  });
});
```

### API Testing

```typescript
describe("UserAPI", () => {
  it("fetches user data successfully", async () => {
    // Arrange
    const mockResponse = { id: 1, name: "John" };
    server.use(
      rest.get("/api/user/:id", (req, res, ctx) => {
        return res(ctx.json(mockResponse));
      })
    );

    // Act
    const result = await UserAPI.fetchUser(1);

    // Assert
    expect(result).toEqual(mockResponse);
  });
});
```

## Coverage Configuration

Default coverage settings:

```typescript
{
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.test.{ts,tsx}',
    '**/*.spec.{ts,tsx}',
    '**/index.{ts,tsx}'
  ]
}
```

## Mocking

### API Mocking

```typescript
import { vi } from "vitest";

vi.mock("@/lib/api", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: "mocked" }),
}));
```

### Time Manipulation

```typescript
import { vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});
```

## Best Practices

1. **File Organization**

   - Keep tests close to implementation files
   - Use consistent naming: `component.test.tsx` or `component.spec.tsx`
   - Group related tests in describe blocks

2. **Testing Strategy**

   - Follow the AAA (Arrange-Act-Assert) pattern
   - Test behavior, not implementation
   - Use user-centric queries from Testing Library
   - Mock external dependencies
   - Keep tests isolated

3. **Test Structure**

   - Keep AAA sections clearly separated
   - Use blank lines between sections
   - Add comments to identify each section
   - Keep each section focused

4. **Naming Conventions**

   ```typescript
   describe("ComponentName", () => {
     it("should [expected behavior] when [condition]", () => {
       // test implementation
     });
   });
   ```

5. **Coverage**

   - Aim for meaningful coverage, not just percentages
   - Cover edge cases and error states
   - Test accessibility where applicable

6. **Performance**
   - Use setup and teardown effectively
   - Mock heavy computations
   - Cleanup resources after tests

## Debugging

### Visual Studio Code

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

## Integration with Other Packages

Test configurations are designed to work with:

- **TypeScript**: Path aliases and types from [`@repo/typescript-config`](../typescript-config/README.md)
- **UI Testing**: Component test patterns from [`@repo/ui`](../ui/README.md)
- **Code Quality**: Test patterns enforced by [`@repo/eslint-config`](../eslint-config/README.md)

## Troubleshooting

1. **Tests Not Running**

   - Check file naming patterns
   - Verify test setup files
   - Check path aliases

2. **Snapshot Issues**

   - Update snapshots with `vitest -u`
   - Review changes carefully
   - Keep snapshots focused

3. **Coverage Problems**
   - Check exclude patterns
   - Verify test file patterns
   - Run with verbose flag

## Contributing

1. Add new configurations in separate files
2. Test changes across different project types
3. Update documentation
4. Consider backwards compatibility

## License

ISC
