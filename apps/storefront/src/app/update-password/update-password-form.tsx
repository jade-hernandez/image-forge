'use client';

import { useState } from 'react';

import { CheckCircle, Loader2, Lock } from 'lucide-react';

import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';

import { updatePassword } from './actions';

export function UpdatePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await updatePassword(formData);

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        setSuccess(true);
        setIsLoading(false);

        setTimeout(() => {
          const redirectUrl =
            '/login?message=' +
            encodeURIComponent(
              'Password updated successfully! Please sign in with your new password.'
            );
          window.location.href = redirectUrl;
        }, 2000);
      }
    } catch (_error) {
      setError('Failed to update password. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='space-y-4 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
          <CheckCircle className='h-8 w-8 text-green-600' />
        </div>

        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-gray-900'>Password updated successfully!</h3>
          <p className='text-sm text-gray-600'>
            Your password has been updated. You&apos;ll be redirected to sign in shortly.
          </p>
        </div>

        <div className='rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
          Redirecting you to the sign in page...
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {error && (
        <div className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
          {error}
        </div>
      )}

      <form action={handleSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='password'>New password</Label>
          <Input
            required
            autoComplete='new-password'
            className='mt-1'
            disabled={isLoading}
            id='password'
            minLength={6}
            name='password'
            placeholder='Enter your new password'
            type='password'
          />
          <p className='mt-1 text-xs text-gray-500'>Must be at least 6 characters long</p>
        </div>

        <div>
          <Label htmlFor='confirmPassword'>Confirm new password</Label>
          <Input
            required
            autoComplete='new-password'
            className='mt-1'
            disabled={isLoading}
            id='confirmPassword'
            minLength={6}
            name='confirmPassword'
            placeholder='Confirm your new password'
            type='password'
          />
        </div>

        <Button
          className='flex w-full items-center justify-center gap-2'
          disabled={isLoading}
          type='submit'
        >
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Lock className='h-4 w-4' />}
          Update password
        </Button>
      </form>
    </div>
  );
}
