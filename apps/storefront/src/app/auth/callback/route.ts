import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error) {
    console.error('OAuth error:', error, errorDescription);
    const errorMessage = errorDescription || 'Authentication failed. Please try again.';
    redirect(`/login?message=${encodeURIComponent(errorMessage)}`);
  }

  if (code) {
    const supabase = await createSupabaseServerClient();

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError);
      redirect(`/login?message=${encodeURIComponent('Authentication failed. Please try again.')}`);
    }

    if (data.user) {
      redirect(next.startsWith('/') ? next : '/');
    }
  }

  redirect('/login?message=' + encodeURIComponent('Authentication failed. Please try again.'));
}
