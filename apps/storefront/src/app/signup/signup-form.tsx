'use client';

import { useState } from 'react';

import { Github, Loader2, Mail, User } from 'lucide-react';

import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Separator } from '@repo/ui/separator';

import { signUpWithEmail, signUpWithGithub } from './actions';

interface SignupFormProps {
  nextUrl?: string;
}

export function SignupForm({ nextUrl }: SignupFormProps) {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleGithubSignUp = async () => {
    setIsGithubLoading(true);
    setError(null);

    try {
      await signUpWithGithub(nextUrl);
    } catch (_error) {
      setError('Failed to sign up with GitHub. Please try again.');
      setIsGithubLoading(false);
    }
  };

  const handleEmailSignUp = async (formData: FormData) => {
    setIsEmailLoading(true);
    setError(null);

    try {
      const result = await signUpWithEmail(formData, nextUrl);

      if (result?.error) {
        setError(result.error);
        setIsEmailLoading(false);
      } else if (result?.success) {
        setEmailSent(true);
        setIsEmailLoading(false);
      }
    } catch (_error) {
      setError('Failed to create account. Please try again.');
      setIsEmailLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className='space-y-4 text-center'>
        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
          <Mail className='h-8 w-8 text-green-600' />
        </div>

        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-gray-900'>Check your email</h3>
          <p className='text-sm text-gray-600'>
            We&apos;ve sent you a confirmation link. Please check your email and click the link to
            activate your account.
          </p>
        </div>

        <div className='rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>
          <strong>Next steps:</strong>
          <br />
          1. Check your email inbox (and spam folder)
          <br />
          2. Click the confirmation link
          <br />
          3. Return here to start using ImageForge
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

      <div>
        <Button
          className='flex w-full items-center justify-center gap-3 bg-gray-900 text-white hover:bg-gray-800'
          disabled={isGithubLoading || isEmailLoading}
          size='lg'
          onClick={handleGithubSignUp}
        >
          {isGithubLoading ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : (
            <Github className='h-5 w-5' />
          )}
          Continue with GitHub
        </Button>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-gray-50 px-2 text-gray-500'>Or create account with email</span>
        </div>
      </div>

      <form action={handleEmailSignUp} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='firstName'>First name</Label>
            <Input
              required
              autoComplete='given-name'
              className='mt-1'
              disabled={isGithubLoading || isEmailLoading}
              id='firstName'
              name='firstName'
              placeholder='John'
              type='text'
            />
          </div>
          <div>
            <Label htmlFor='lastName'>Last name</Label>
            <Input
              required
              autoComplete='family-name'
              className='mt-1'
              disabled={isGithubLoading || isEmailLoading}
              id='lastName'
              name='lastName'
              placeholder='Doe'
              type='text'
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor='email'>Email address</Label>
          <Input
            required
            autoComplete='email'
            className='mt-1'
            disabled={isGithubLoading || isEmailLoading}
            id='email'
            name='email'
            placeholder='john@example.com'
            type='email'
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            required
            autoComplete='new-password'
            className='mt-1'
            disabled={isGithubLoading || isEmailLoading}
            id='password'
            minLength={6}
            name='password'
            placeholder='At least 6 characters'
            type='password'
          />
          <p className='mt-1 text-xs text-gray-500'>Must be at least 6 characters long</p>
        </div>

        <div>
          <Label htmlFor='confirmPassword'>Confirm password</Label>
          <Input
            required
            autoComplete='new-password'
            className='mt-1'
            disabled={isGithubLoading || isEmailLoading}
            id='confirmPassword'
            minLength={6}
            name='confirmPassword'
            placeholder='Confirm your password'
            type='password'
          />
        </div>

        <Button
          className='flex w-full items-center justify-center gap-2'
          disabled={isGithubLoading || isEmailLoading}
          type='submit'
          variant='outline'
        >
          {isEmailLoading ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <User className='h-4 w-4' />
          )}
          Create account
        </Button>
      </form>
    </div>
  );
}
