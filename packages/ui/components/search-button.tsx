import * as React from 'react';
import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { Search } from 'lucide-react';

import { cn } from '../lib/utils';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface SearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipText?: string;
  shortcut?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  showTooltip?: boolean;
  asChild?: boolean;
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  (
    {
      tooltipText = 'Search',
      shortcut,
      icon: Icon = Search,
      showTooltip = true,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const tooltipContent = React.useMemo(() => {
      if (!shortcut) return tooltipText;
      return (
        <div className='flex items-center gap-2'>
          <span>{tooltipText}</span>
          <kbd className='bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium'>
            {shortcut}
          </kbd>
        </div>
      );
    }, [tooltipText, shortcut]);

    const Comp = asChild ? Slot : Button;

    const button = (
      <Comp
        ref={ref}
        size={!asChild ? 'icon' : undefined}
        variant={!asChild ? 'ghost' : undefined}
        aria-label={tooltipText}
        className={cn('h-9 w-9 p-0', className)}
        {...props}
      >
        <Icon className='h-[1.2rem] w-[1.2rem]' />
      </Comp>
    );

    if (!showTooltip) {
      return button;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

SearchButton.displayName = 'SearchButton';
