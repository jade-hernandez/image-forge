import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export interface User {
  id?: string;
  email?: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    avatar_url?: string;
    agencyName?: string;
  };
}

const userProfileVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
    },
  },
  defaultVariants: {
    size: 'md',
    justify: 'start',
    align: 'center',
  },
});

export interface UserProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userProfileVariants> {
  user: User | null;
  showText?: boolean;
  getInitials?: (user: User | null) => string;
  getDisplayName?: (user: User | null) => string;
  getSecondaryText?: (user: User | null) => string;
  avatarClassName?: string;
  avatarProps?: React.ComponentPropsWithoutRef<typeof Avatar>;
}

export function getUserInitials(user: User | null): string {
  if (!user) {
    return '';
  }

  const firstName = user.user_metadata?.firstName;
  const lastName = user.user_metadata?.lastName;

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  return user.email?.[0]?.toUpperCase() || '';
}

export function getUserDisplayName(user: User | null): string {
  if (!user) {
    return 'User';
  }

  const firstName = user.user_metadata?.firstName || '';
  const lastName = user.user_metadata?.lastName || '';

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return user.email || 'User';
}

export function getUserSecondaryText(user: User | null): string {
  if (!user) {
    return '';
  }

  return user.user_metadata?.agencyName || user.email || '';
}

export function UserProfile({
  user,
  size,
  justify,
  align,
  showText = true,
  getInitials = getUserInitials,
  getDisplayName = getUserDisplayName,
  getSecondaryText = getUserSecondaryText,
  avatarClassName,
  avatarProps,
  className,
  ...props
}: UserProfileProps) {
  if (!user) {
    return null;
  }

  const avatarSizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }[(size as string) || 'md'];

  const nameSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[(size as string) || 'md'];

  const secondarySizeClass = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }[(size as string) || 'md'];

  return (
    <div className={cn(userProfileVariants({ size, justify, align }), className)} {...props}>
      <Avatar className={cn(avatarSizeClass, avatarClassName)} {...avatarProps}>
        <AvatarImage alt={getDisplayName(user)} src={user.user_metadata?.avatar_url} />
        <AvatarFallback>{getInitials(user)}</AvatarFallback>
      </Avatar>

      {showText && (
        <div className='flex-1 overflow-hidden'>
          <p className={cn('truncate font-medium', nameSizeClass)}>{getDisplayName(user)}</p>
          <p className={cn('text-muted-foreground truncate', secondarySizeClass)}>
            {getSecondaryText(user)}
          </p>
        </div>
      )}
    </div>
  );
}
