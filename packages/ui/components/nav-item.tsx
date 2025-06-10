import * as React from 'react';
import { forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { BadgeWithTooltip } from './badge-with-tooltip';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const navItemVariants = cva(
  'flex items-center relative rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted',
        ghost: 'hover:bg-transparent',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      active: {
        true: '',
        false: '',
      },
      activeStyle: {
        background: 'bg-primary/10 font-medium text-primary',
        'left-border':
          "after:absolute after:left-0 after:top-1/2 after:h-5 after:w-1 after:-translate-y-1/2 after:rounded-r-full after:bg-primary after:content-['']",
        both: "bg-primary/10 font-medium text-primary after:absolute after:left-0 after:top-1/2 after:h-5 after:w-1 after:-translate-y-1/2 after:rounded-r-full after:bg-primary after:content-['']",
        none: '',
      },
      size: {
        default: 'py-2.5 px-3',
        sm: 'py-1.5 px-2.5 text-xs',
        lg: 'py-3 px-4 text-base',
      },
      iconPlacement: {
        left: 'flex-row',
        right: 'flex-row-reverse',
        none: '',
      },
      collapsed: {
        true: 'justify-center px-2',
        false: '',
      },
    },
    compoundVariants: [
      {
        active: false,
        variant: 'default',
        className: 'text-foreground hover:bg-muted hover:text-foreground',
      },
      {
        iconPlacement: 'left',
        collapsed: false,
        className: 'gap-3',
      },
      {
        iconPlacement: 'right',
        collapsed: false,
        className: 'gap-3',
      },
    ],
    defaultVariants: {
      variant: 'default',
      active: false,
      activeStyle: 'both',
      size: 'default',
      iconPlacement: 'left',
      collapsed: false,
    },
  }
);

export interface NavItemIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  colorOnActive?: boolean;
  activeColor?: string;
}

export interface NavItemProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    Omit<VariantProps<typeof navItemVariants>, 'active'> {
  href: string;
  label: string;
  isActive?: boolean;
  icon?: NavItemIconProps;
  badgeCount?: number;
  badgeLabel?: string;
  onItemClick?: () => void;
  asChild?: boolean;
  renderItem?: (props: {
    className: string;
    children: React.ReactNode;
    isActive: boolean;
    href: string;
    onClick?: () => void;
  }) => React.ReactNode;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    {
      href,
      label,
      className,
      icon,
      isActive = false,
      activeStyle,
      collapsed = false,
      variant,
      size,
      badgeCount = 0,
      badgeLabel = 'notifications',
      onItemClick,
      asChild = false,
      renderItem,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : 'a';
    const iconPlacement = icon ? (collapsed ? 'none' : 'left') : 'none';

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onItemClick?.();
      }
    };

    const content = (
      <>
        {icon && (
          <div className={cn('flex items-center justify-center', collapsed ? 'relative' : '')}>
            <icon.icon
              className={cn(
                'h-5 w-5 flex-shrink-0',
                isActive && icon.colorOnActive && (icon.activeColor || 'text-primary'),
                icon.className
              )}
              aria-hidden='true'
            />
            {collapsed && badgeCount > 0 && (
              <BadgeWithTooltip
                count={badgeCount}
                label={badgeLabel}
                position='top-right'
                size='sm'
                variant='default'
              />
            )}
          </div>
        )}

        {!collapsed && <span>{label}</span>}

        {!collapsed && badgeCount > 0 && (
          <BadgeWithTooltip
            className='ml-auto'
            count={badgeCount}
            label={badgeLabel}
            showTooltip={false}
            size='default'
            variant='default'
          />
        )}
      </>
    );

    const item = (
      <Comp
        ref={ref}
        href={asChild ? undefined : href}
        className={cn(
          navItemVariants({
            variant,
            active: isActive,
            activeStyle: isActive ? activeStyle : 'none',
            size,
            iconPlacement,
            collapsed,
            className,
          })
        )}
        onClick={onItemClick}
        onKeyDown={handleKeyDown}
        role='menuitem'
        tabIndex={0}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {content}
      </Comp>
    );

    if (renderItem) {
      return renderItem({
        className: cn(
          navItemVariants({
            variant,
            active: isActive,
            activeStyle: isActive ? activeStyle : 'none',
            size,
            iconPlacement,
            collapsed,
          })
        ),
        children: content,
        isActive,
        href,
        onClick: onItemClick,
      });
    }

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{item}</TooltipTrigger>
            <TooltipContent side='right'>{label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return item;
  }
);

NavItem.displayName = 'NavItem';
