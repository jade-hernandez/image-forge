'use server';

import { revalidatePath } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase';

export async function updatePassword(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
      return { error: 'Both password fields are required' };
    }

    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters long' };
    }

    if (password !== confirmPassword) {
      return { error: 'Passwords do not match' };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        error:
          'You must be signed in to update your password. Please use the reset link from your email.',
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error('Password update error:', error);

      if (error.message.includes('Password should be at least')) {
        return { error: 'Password is too weak. Please choose a stronger password.' };
      }

      return { error: 'Failed to update password. Please try again.' };
    }

    revalidatePath('/', 'layout');

    return {
      success: true,
      message: 'Password updated successfully!',
    };
  } catch (error) {
    console.error('Unexpected error in updatePassword:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
