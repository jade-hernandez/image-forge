import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { LoginForm } from './login-form';

export default async function LoginPage({
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
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>Sign in to ImageForge</h2>
          <p className='mt-2 text-sm text-gray-600'>Continue processing your images</p>
        </div>

        {params.message && (
          <div className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {params.message}
          </div>
        )}

        <LoginForm nextUrl={params.next} />

        <div className='space-y-2 text-center'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link
              className='font-medium text-blue-600 hover:text-blue-500'
              href={`/signup${params.next ? `?next=${encodeURIComponent(params.next)}` : ''}`}
            >
              Sign up here
            </Link>
          </p>
          <p className='text-sm'>
            <Link className='text-blue-600 hover:text-blue-500' href='/reset-password'>
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
