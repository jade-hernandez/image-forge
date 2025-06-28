'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

export async function signInWithGithub(nextUrl?: string) {
  const supabase = await createSupabaseServerClient();

  const redirectTo = new URL('/auth/callback', process.env.NEXT_PUBLIC_SITE_URL);
  if (nextUrl) {
    redirectTo.searchParams.set('next', nextUrl);
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo.toString(),
      },
    });

    if (error) {
      redirect(
        `/login?message=${encodeURIComponent('Failed to sign in with GitHub. Please try again.')}`
      );
    }

    if (data.url) {
      redirect(data.url);
    } else {
      redirect('/login?message=' + encodeURIComponent('OAuth setup incomplete. Please try again.'));
    }
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof error.digest === 'string' &&
      error.digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }

    console.error('Unexpected error in signInWithGithub:', error);
    redirect(
      `/login?message=${encodeURIComponent('An unexpected error occurred. Please try again.')}`
    );
  }
}

export async function signInWithEmail(formData: FormData, nextUrl?: string) {
  const supabase = await createSupabaseServerClient();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid input types for email or password' };
  }

  if (!email.includes('@')) {
    return { error: 'Please enter a valid email address' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Invalid email or password. Please check your credentials.' };
      }

      if (error.message.includes('Email not confirmed')) {
        return {
          error: 'Please check your email and click the confirmation link before signing in.',
        };
      }

      return { error: 'Failed to sign in. Please try again.' };
    }

    if (data.user) {
      revalidatePath('/', 'layout');

      const redirectTo = nextUrl || '/';

      redirect(redirectTo);
    }

    return { error: 'An unexpected error occurred. Please try again.' };
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }

    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
