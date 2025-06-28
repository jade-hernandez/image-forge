import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

export default async function ProfilePage() {
  // Todo: Below block is in fact an auth guard, hence we could move it to a custom withAuth / authGuard component / context / provider or else
  ////////
  ////////
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }
  ////////
  ////////

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <h1 className='mb-6 text-3xl font-bold'>Profile Page</h1>

      <div className='rounded-lg border bg-white p-6'>
        <h2 className='mb-4 text-xl font-semibold'>🔒 Protected Content</h2>
        <p className='mb-4 text-green-600'>
          If you can see this page, your middleware is working correctly!
        </p>

        <div className='space-y-2'>
          <p>
            <span className='font-medium'>User Email:</span> {user.email}
          </p>
          <p>
            <span className='font-medium'>User ID:</span> {user.id}
          </p>
          <p>
            <span className='font-medium'>Provider:</span> {user.app_metadata.provider}
          </p>
        </div>
      </div>

      <div className='mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
        <p className='text-sm text-blue-800'>
          <strong>Note:</strong> If you&apos;re not logged in, the middleware should redirect you to
          /login
        </p>
      </div>
    </div>
  );
}
