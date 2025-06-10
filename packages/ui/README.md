# @repo/ui

Shared UI component library for the Financeclub monorepo, built on top of [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components built using Radix UI and Tailwind CSS.

## Features

- 🎯 Zero-runtime UI components built on Radix UI primitives
- 🎨 Customizable and accessible components
- 🌗 Light and dark mode support
- 📱 Responsive and mobile-first design
- ♿ ARIA-compliant with first-class accessibility
- 🔒 Type-safe with TypeScript
- 🧪 Comprehensive test coverage

## Overview

Our UI system extends shadcn/ui's components to create a cohesive design system:

1. **Base Layer**: shadcn/ui components provide the foundation
2. **Theme Layer**: Our Tailwind theme customizations
3. **Custom Layer**: Our specific implementations and variants

## Installation

This package is included by default in the monorepo. For manual installation:

```bash
pnpm add -D @repo/ui
```

For new shadcn/ui components, use the CLI from the UI package directory:

```bash
pnpm dlx shadcn-ui@latest add [component-name]
```

## Usage

Import components directly from the package:

```typescript
import { Button, Card, Input } from '@repo/ui';

export default function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Base Components (shadcn/ui)

### Layout & Structure

- `Accordion` - Expandable content sections
- `AspectRatio` - Maintain aspect ratios
- `Card` - Content containers
- `Resizable` - Resizable panels
- `ScrollArea` - Custom scrolling areas
- `Separator` - Visual dividers
- `Sheet` - Slide-out panels
- `Sidebar` - Navigation sidebar

### Forms & Input

- `Button` - Action buttons
- `Checkbox` - Selection controls
- `Form` - Form wrapper with validation
- `Input` - Text input fields
- `InputOTP` - One-time password input
- `Label` - Form labels
- `RadioGroup` - Radio button groups
- `Select` - Dropdown selection
- `Slider` - Range selection
- `Switch` - Toggle switches
- `Textarea` - Multi-line text input
- `Toggle` - Toggle buttons
- `ToggleGroup` - Grouped toggles

### Navigation & Menus

- `Breadcrumb` - Page navigation breadcrumbs
- `Command` - Command palette interface
- `ContextMenu` - Right-click menus
- `DropdownMenu` - Dropdown menus
- `Menubar` - Application menu bars
- `NavigationMenu` - Navigation components
- `Pagination` - Page navigation controls
- `Tabs` - Tab-based navigation

### Data Display

- `Calendar` - Date display and selection
- `Carousel` - Image/content sliders
- `Chart` - Data visualization
- `DataTable` - Advanced data tables
- `DatePicker` - Date selection
- `HoverCard` - Hover information displays
- `Table` - Basic data tables

### Feedback & Overlay

- `Alert` - User notifications
- `AlertDialog` - Confirmation dialogs
- `Dialog` - Modal dialogs
- `Drawer` - Sliding panels
- `Popover` - Contextual overlays
- `Progress` - Progress indicators
- `Skeleton` - Loading states
- `Sonner` - Toast notifications
- `Toast` - Temporary notifications
- `Tooltip` - Informational tooltips

### Visual Elements

- `Avatar` - User avatars
- `Badge` - Status indicators
- `Collapsible` - Expandable content

## Custom Components

[List of our custom components built on top of shadcn/ui - To be documented]

## Custom Hooks

The package includes several custom hooks:

- `use-mobile` - Mobile detection and responsive utilities
- `use-toast` - Toast notification management

## Component Examples

### Basic Button

```typescript
// Basic button with variants
<Button variant="default">Default Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Card Component

```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

### Form Elements

```typescript
<Form>
  <FormField>
    <FormLabel>Username</FormLabel>
    <FormControl>
      <Input placeholder="Enter username" />
    </FormControl>
    <FormDescription>
      This is your public display name.
    </FormDescription>
    <FormMessage />
  </FormField>
</Form>
```

## Integration with Other Packages

The UI library is designed to work seamlessly with other monorepo packages:

- **TypeScript Configuration**: Path aliases and types are provided by [`@repo/typescript-config`](../typescript-config/README.md)
- **Styling**: Tailwind classes and themes are from [`@repo/tailwind-config`](../tailwind-config/README.md)
- **Code Quality**: Component patterns are enforced by [`@repo/eslint-config`](../eslint-config/README.md)
- **Testing**: Component tests use [`@repo/vitest-config`](../vitest-config/README.md)

## Best Practices

1. **Component Usage**

   - Use semantic props for variants
   - Leverage composition over configuration
   - Follow accessibility guidelines

2. **Styling**

   - Use provided Tailwind classes
   - Follow theming conventions
   - Maintain responsive design

3. **Accessibility**
   - Include ARIA labels
   - Support keyboard navigation
   - Maintain focus management

## Development

```bash
# Run tests
pnpm test

# Build package
pnpm build

# Run type checking
pnpm check-types

# Lint code
pnpm lint
```

## Testing

Components are tested using Vitest and Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

## Contributing

1. Follow component patterns
2. Write comprehensive tests
3. Include stories for visual testing
4. Document props and usage
5. Consider accessibility
6. Add appropriate types

## Credits

This component library is built on top of [shadcn/ui](https://ui.shadcn.com/) by [shadcn](https://twitter.com/shadcn). We're grateful for the excellent foundation it provides.

Core technologies:

- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## License

ISC
