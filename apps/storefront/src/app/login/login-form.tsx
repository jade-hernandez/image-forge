'use client';

import { useState } from 'react';

import { Github, Loader2, Mail } from 'lucide-react';

import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Separator } from '@repo/ui/separator';

import { signInWithEmail, signInWithGithub } from './actions';

interface LoginFormProps {
  nextUrl?: string;
}

export function LoginForm({ nextUrl }: LoginFormProps) {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    setError(null);

    try {
      await signInWithGithub(nextUrl);
    } catch (_error) {
      setError('Failed to sign in with GitHub. Please try again.');
      setIsGithubLoading(false);
    }
  };

  const handleEmailSignIn = async (formData: FormData) => {
    setIsEmailLoading(true);
    setError(null);

    try {
      const result = await signInWithEmail(formData, nextUrl);

      if (result?.error) {
        setError(result.error);
        setIsEmailLoading(false);
      }
    } catch (_error) {
      setError('Failed to sign in. Please check your credentials.');
      setIsEmailLoading(false);
    }
  };

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
          onClick={handleGithubSignIn}
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
          <span className='bg-gray-50 px-2 text-gray-500'>Or continue with email</span>
        </div>
      </div>

      <form action={handleEmailSignIn} className='space-y-4'>
        <div>
          <Label htmlFor='email'>Email address</Label>
          <Input
            required
            autoComplete='email'
            className='mt-1'
            disabled={isGithubLoading || isEmailLoading}
            id='email'
            name='email'
            placeholder='Enter your email'
            type='email'
          />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            required
            autoComplete='current-password'
            className='mt-1'
            disabled={isGithubLoading || isEmailLoading}
            id='password'
            name='password'
            placeholder='Enter your password'
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
            <Mail className='h-4 w-4' />
          )}
          Sign in with email
        </Button>
      </form>
    </div>
  );
}
