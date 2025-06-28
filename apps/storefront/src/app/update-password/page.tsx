import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

import { UpdatePasswordForm } from './update-password-form';

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      '/reset-password?message=' +
        encodeURIComponent('Please use the reset link from your email to update your password.')
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Update your password</h2>
          <p className='mt-2 text-sm text-gray-600'>Enter your new password below</p>
        </div>

        {params.message && (
          <div className='rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>
            {params.message}
          </div>
        )}

        {params.error && (
          <div className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {params.error}
          </div>
        )}

        <UpdatePasswordForm />

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            <Link className='font-medium text-blue-600 hover:text-blue-500' href='/login'>
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
