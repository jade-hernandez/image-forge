'use client';

import { useState } from 'react';

import { CheckCircle, Loader2, Mail } from 'lucide-react';

import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';

import { requestPasswordReset } from './actions';

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await requestPasswordReset(formData);

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.success) {
        setEmailSent(true);
        setEmail(formData.get('email') as string);
        setIsLoading(false);
      }
    } catch (_error) {
      setError('Failed to send reset email. Please try again.');
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className='space-y-4 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
          <CheckCircle className='h-8 w-8 text-green-600' />
        </div>

        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-gray-900'>Check your email</h3>
          <p className='text-sm text-gray-600'>
            We&apos;ve sent a password reset link to <span className='font-medium'>{email}</span>
          </p>
        </div>

        <div className='rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>
          <strong>Next steps:</strong>
          <br />
          1. Check your email inbox (and spam folder)
          <br />
          2. Click the &quot;Reset Password&quot; link
          <br />
          3. Enter your new password
        </div>

        <Button
          className='w-full'
          variant='outline'
          onClick={() => {
            setEmailSent(false);
            setError(null);
            setEmail('');
          }}
        >
          Send another email
        </Button>
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
          <Label htmlFor='email'>Email address</Label>
          <Input
            required
            autoComplete='email'
            className='mt-1'
            disabled={isLoading}
            id='email'
            name='email'
            placeholder='Enter your email address'
            type='email'
          />
          <p className='mt-1 text-xs text-gray-500'>
            We&apos;ll send a password reset link to this email
          </p>
        </div>

        <Button
          className='flex w-full items-center justify-center gap-2'
          disabled={isLoading}
          type='submit'
        >
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Mail className='h-4 w-4' />}
          Send reset link
        </Button>
      </form>
    </div>
  );
}
