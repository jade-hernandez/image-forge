import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { Badge } from './badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const badgeWithTooltipVariants = cva('inline-flex items-center justify-center rounded-full', {
  variants: {
    position: {
      default: '',
      'top-right': 'absolute -right-1 -top-1',
    },
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border border-input bg-background text-foreground',
    },
    size: {
      default: 'text-xs px-2.5 py-0.5',
      sm: 'h-4 w-4 text-[10px] p-0',
      md: 'h-5 w-5 text-xs p-0',
      lg: 'h-6 w-6 text-sm p-0',
    },
  },
  defaultVariants: {
    position: 'default',
    variant: 'default',
    size: 'default',
  },
});

export interface BadgeWithTooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeWithTooltipVariants> {
  count: number;
  label?: string;
  showTooltip?: boolean;
  tooltipContent?: React.ReactNode;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}

export function BadgeWithTooltip({
  count,
  label = 'items',
  position,
  variant,
  size,
  showTooltip = true,
  tooltipContent,
  tooltipSide = 'top',
  className,
  ...props
}: BadgeWithTooltipProps) {
  if (count <= 0) {
    return null;
  }

  const displayCount = count > 99 ? '99+' : count.toString();

  const badgeContent = (
    <Badge
      aria-label={`${count} ${label}`}
      className={cn(badgeWithTooltipVariants({ position, variant, size }), className)}
      {...props}
    >
      {displayCount}
    </Badge>
  );

  const finalTooltipContent = tooltipContent || (
    <>
      {count} {label}
    </>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{finalTooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeContent;
}
