import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

import { SignupForm } from './signup-form';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; next?: string }>;
}) {
  const params = await searchParams;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const redirectTo = params.next || '/';
    redirect(redirectTo);
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Create your ImageForge account</h2>
          <p className='mt-2 text-sm text-gray-600'>Start with 30 free image processing credits</p>
        </div>

        {params.message && (
          <div className='rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>
            {params.message}
          </div>
        )}

        <SignupForm nextUrl={params.next} />

        <div className='space-y-2 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link
              className='font-medium text-blue-600 hover:text-blue-500'
              href={`/login${params.next ? `?next=${encodeURIComponent(params.next)}` : ''}`}
            >
              Sign in here
            </Link>
          </p>

          <p className='border-t pt-4 text-xs text-gray-500'>
            By signing up, you agree to our{' '}
            <Link className='text-blue-600 hover:text-blue-500' href='/terms'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className='text-blue-600 hover:text-blue-500' href='/privacy'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
