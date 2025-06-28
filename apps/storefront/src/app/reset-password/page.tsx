import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

import { ResetPasswordForm } from './reset-password-form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Reset your password</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Enter your email address and we&apos;ll send you a reset link
          </p>
        </div>

        {params.message && (
          <div className='rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>
            {params.message}
          </div>
        )}

        <ResetPasswordForm />

        <div className='space-y-2 text-center'>
          <p className='text-sm text-gray-600'>
            Remember your password?{' '}
            <Link className='font-medium text-blue-600 hover:text-blue-500' href='/login'>
              Sign in here
            </Link>
          </p>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link className='font-medium text-blue-600 hover:text-blue-500' href='/signup'>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
