'use server';

import { createSupabaseServerClient } from '@/lib/supabase';

export async function requestPasswordReset(formData: FormData) {
  try {
    const supabase = await createSupabaseServerClient();

    const email = formData.get('email') as string;

    if (!email) {
      return { error: 'Email address is required' };
    }

    if (!email.includes('@')) {
      return { error: 'Please enter a valid email address' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });

    if (error) {
      return {
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
      };
    }

    return {
      success: true,
      message: 'Password reset link sent successfully!',
    };
  } catch (_error) {
    return {
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
    };
  }
}
