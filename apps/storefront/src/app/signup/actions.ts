'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase';

export async function signUpWithGithub(nextUrl?: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const redirectTo = new URL('/auth/callback', process.env.NEXT_PUBLIC_SITE_URL);
    if (nextUrl) {
      redirectTo.searchParams.set('next', nextUrl);
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo.toString(),
      },
    });

    if (error) {
      console.error('GitHub OAuth signup error:', error);
      redirect(
        `/signup?message=${encodeURIComponent('Failed to sign up with GitHub. Please try again.')}`
      );
    }

    if (data.url) {
      redirect(data.url);
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

    console.error('Unexpected error in signUpWithGithub:', error);
    redirect(
      `/signup?message=${encodeURIComponent('An unexpected error occurred. Please try again.')}`
    );
  }
}

export async function signUpWithEmail(formData: FormData, nextUrl?: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return { error: 'All fields are required' };
    }

    if (firstName.trim().length < 1) {
      return { error: 'First name is required' };
    }

    if (lastName.trim().length < 1) {
      return { error: 'Last name is required' };
    }

    if (!email.includes('@')) {
      return { error: 'Please enter a valid email address' };
    }

    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long' };
    }

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (error) {
      console.error('Email signup error:', error);

      if (error.message.includes('User already registered')) {
        return { error: 'An account with this email already exists. Please sign in instead.' };
      }

      if (error.message.includes('Password should be at least')) {
        return { error: 'Password is too weak. Please choose a stronger password.' };
      }

      if (error.message.includes('Invalid email')) {
        return { error: 'Please enter a valid email address.' };
      }

      return { error: 'Failed to create account. Please try again.' };
    }

    if (data.user) {
      if (data.user.id && !data.user.email_confirmed_at) {
        return {
          success: true,
          message: 'Account created! Please check your email to confirm your account.',
        };
      }

      await updateUserProfile(data.user.id, firstName.trim(), lastName.trim());

      revalidatePath('/', 'layout');
      const redirectTo = nextUrl || '/';
      redirect(redirectTo);
    }

    return { error: 'An unexpected error occurred. Please try again.' };
  } catch (error) {
    console.error('Unexpected error in signUpWithEmail:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

async function updateUserProfile(userId: string, firstName: string, lastName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase
      .from('user_profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Profile update error:', error);
    }
  } catch (error) {
    console.error('Unexpected error in updateUserProfile:', error);
  }
}
