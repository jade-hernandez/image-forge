# @repo/tailwind-config

Shared Tailwind CSS configuration for the Financeclub monorepo. This package provides standardized styling, theming, and design tokens across all projects.

## Features

- 🎨 Consistent color system with light/dark themes
- 🔄 Shared animations and transitions
- 📱 Responsive container queries
- ⚡ Performance-optimized configuration
- 🎯 Modern CSS reset
- 🌗 Dark mode support
- 🧩 Common UI plugin integrations

## Installation

This package is included by default in the monorepo. For manual installation:

```bash
pnpm add -D @repo/tailwind-config
```

## Usage

**Related Configurations:**

- UI component classes should follow patterns from [`@repo/ui`](../ui/README.md)
- CSS imports are sorted by [`@repo/prettier-config`](../prettier-config/README.md)
- TypeScript support for classes is enabled in [`@repo/typescript-config`](../typescript-config/README.md)

### Basic Setup

In your project's `tailwind.config.ts`:

```typescript
import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  // Extend the shared config
  ...sharedConfig,
  // Add app-specific content paths
  content: [...sharedConfig.content, "../../packages/ui/**/*.{js,ts,jsx,tsx}"],
} satisfies Config;
```

### CSS Setup

In your project's root CSS file:

```css
@import "@repo/tailwind-config/styles/base.css";
```

## Configuration Details

### Color System

Our color system uses CSS variables for dynamic theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  --primary: 24 9.8% 10%;
  /* ... other color variables */
}
```

Access these in your components:

```typescript
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

### Dark Mode

Dark mode is automatically handled. Enable it by adding the `dark` class to any parent element:

```html
<html class="dark">
  <!-- Content will use dark theme -->
</html>
```

### Animations

Pre-configured animations and keyframes:

```typescript
<div className="animate-accordion-down">
  <!-- Content will animate -->
</div>
```

Available animations:

- `accordion-down`
- `accordion-up`
- `spotlight`
- `text-slide`
- `scroll`
- `shimmer`

## CSS Reset

This package uses Josh Comeau's Custom CSS Reset with modern enhancements. Note that some features like `text-wrap: pretty` and `text-wrap: balance` require modern browsers.

For browsers that don't support these features, the text will gracefully fallback to default wrapping behavior.

## Included Plugins

- `@tailwindcss/typography` - Beautiful typographic defaults
- `@tailwindcss/forms` - Form element styling
- `tailwindcss-animate` - Animation utilities

## Directory Structure

```
packages/tailwind-config/
├── index.ts           # Main configuration
├── animation.ts       # Animation definitions
├── colors.ts         # Color system
├── styles/
│   ├── base.css     # Base styles
│   ├── reset.css    # CSS reset
│   ├── globals.css  # Global styles
│   └── themes/
│       ├── light.css
│       └── dark.css
```

## Best Practices

1. **Extending the Config**

```typescript
// Correct way to extend
export default {
  ...sharedConfig,
  theme: {
    extend: {
      // Your extensions here
    },
  },
};
```

2. **Using CSS Variables**

```typescript
// Prefer
className = "bg-primary";
// Over
className = "bg-[#FF0000]";
```

3. **Responsive Design**

```typescript
// Use built-in breakpoints
className = "md:flex lg:grid";
```

## Contributing

1. All changes to Tailwind configuration should be made in this package
2. Test changes across different projects
3. Update this README when adding new features
4. Consider browser compatibility

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Some features require specific browser versions:
  - `text-wrap: pretty` - Chrome 114+, Edge 114+, Opera 100+
  - `text-wrap: balance` - Chrome 117+, Edge 117+, Opera 103+

## License

ISC
