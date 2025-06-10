'use client';

import React, { useEffect, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '../lib/utils';
import { Button } from './button';
import { Input } from './input';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showToggle?: boolean;
}

export function PasswordInput({ className, showToggle = true, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Track input element for direct manipulation if needed
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputElement(inputRef.current);
    }
  }, []);

  // Force update the input type when state changes
  useEffect(() => {
    if (inputElement) {
      inputElement.type = showPassword ? 'text' : 'password';
    }
  }, [showPassword, inputElement]);

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      {showToggle && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => {
            setShowPassword(!showPassword);
            console.log('Toggle clicked, new state will be:', !showPassword);
          }}
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className='text-muted-foreground h-4 w-4' aria-hidden='true' />
          ) : (
            <Eye className='text-muted-foreground h-4 w-4' aria-hidden='true' />
          )}
        </Button>
      )}
    </div>
  );
}
