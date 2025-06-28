import Link from 'next/link';

import { AlertCircle, Home, RotateCcw } from 'lucide-react';

import { Button } from '@repo/ui/button';

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.message || 'Something went wrong. Please try again.';

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 text-center'>
        <div className='flex justify-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <AlertCircle className='h-8 w-8 text-red-600' />
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-900'>Oops! Something went wrong</h2>

          <div className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {errorMessage}
          </div>

          <p className='text-gray-600'>
            We&apos;re sorry for the inconvenience. Please try again or contact support if the
            problem persists.
          </p>
        </div>

        <div className='space-y-3'>
          <Button asChild className='w-full'>
            <Link href='/login'>
              <RotateCcw className='mr-2 h-4 w-4' />
              Try Again
            </Link>
          </Button>

          <Button asChild className='w-full' variant='outline'>
            <Link href='/'>
              <Home className='mr-2 h-4 w-4' />
              Go Home
            </Link>
          </Button>
        </div>

        <div className='border-t pt-4'>
          <p className='text-sm text-gray-500'>
            Need help?{' '}
            <Link className='text-blue-600 hover:text-blue-500' href='/contact'>
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
