import { createSupabaseServerClient } from '@/lib/supabase';

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  // Todo: This is a temporary implementation as we're in development phase.
  if (error) {
    console.error('Error fetching user:', error);
    return (
      <div className='text-red-600'>
        <p>Error fetching user information. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl p-8'>
      <h1 className='mb-6 text-4xl font-bold'>ImageForge</h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-white p-6'>
          <h2 className='mb-4 text-xl font-semibold'>System Status</h2>
          <div className='space-y-2'>
            <p>
              <span className='font-medium'>Supabase:</span>{' '}
              <span className='text-green-600'>✅ Connected</span>
            </p>
            <p>
              <span className='font-medium'>Middleware:</span>{' '}
              <span className='text-green-600'>✅ Active</span>
            </p>
            <p>
              <span className='font-medium'>User Status:</span>{' '}
              {data.user ? (
                <span className='text-blue-600'>🟢 Authenticated</span>
              ) : (
                <span className='text-gray-600'>🔘 Anonymous</span>
              )}
            </p>
          </div>
        </div>

        <div className='rounded-lg border bg-white p-6'>
          <h2 className='mb-4 text-xl font-semibold'>User Information</h2>
          {data.user ? (
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Email:</span> {data.user.email}
              </p>
              <p>
                <span className='font-medium'>ID:</span> {data.user.id.slice(0, 8)}...
              </p>
              <p>
                <span className='font-medium'>Provider:</span> {data.user.app_metadata.provider}
              </p>
            </div>
          ) : (
            <div className='space-y-2 text-gray-600'>
              <p>No user logged in</p>
              <p className='text-sm'>This is normal - you haven&apos;t implemented login yet!</p>
            </div>
          )}
        </div>
      </div>

      <div className='mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6'>
        <h2 className='mb-4 text-xl font-semibold text-blue-800'>Route Protection Test</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='text-center'>
            <p className='font-medium text-green-800'>✅ Public Route</p>
            <p className='text-sm text-green-600'>/ (This page)</p>
            <p className='text-xs'>Available to everyone</p>
          </div>
          <div className='text-center'>
            <p className='font-medium text-orange-800'>🔒 Protected Route</p>
            <p className='text-sm text-orange-600'>/profile</p>
            <p className='text-xs'>Requires authentication</p>
          </div>
          <div className='text-center'>
            <p className='font-medium text-green-800'>✅ Auth Route</p>
            <p className='text-sm text-green-600'>/login</p>
            <p className='text-xs'>Available to everyone</p>
          </div>
        </div>
      </div>

      <div className='mt-8 rounded-lg border border-green-200 bg-green-50 p-6'>
        <h2 className='mb-4 text-xl font-semibold text-green-800'>✅ Middleware Setup Complete!</h2>
        <p className='mb-4 text-green-700'>
          Your authentication middleware is now active and ready for the next phase.
        </p>
        <ul className='space-y-1 text-sm text-green-700'>
          <li>• Session management: Automatic refresh</li>
          <li>• Route protection: Only /profile and /settings</li>
          <li>• Main app access: Available to all users</li>
          <li>• Ready for login/signup implementation</li>
        </ul>
      </div>
    </div>
  );
}
