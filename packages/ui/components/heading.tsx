import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../lib/utils';

const headingVariants = cva('font-heading text-foreground scroll-m-20', {
  variants: {
    size: {
      xs: 'text-sm font-semibold tracking-tight',
      sm: 'text-base font-semibold tracking-tight',
      md: 'text-lg font-semibold tracking-tight',
      lg: 'text-xl font-semibold tracking-tight',
      xl: 'text-2xl font-bold tracking-tight',
      '2xl': 'text-3xl font-bold tracking-tight',
      '3xl': 'text-4xl font-bold tracking-tight',
      '4xl': 'text-5xl font-bold tracking-tight',
      '5xl': 'text-6xl font-bold tracking-tight',
      '6xl': 'text-7xl font-bold tracking-tight',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'xl',
    weight: 'bold',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, as = 'h2', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component ref={ref} className={cn(headingVariants({ size, weight, className }))} {...props}>
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
