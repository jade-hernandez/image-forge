import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import { type EmailOtpType, type UserMetadata } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      redirect(
        `/login?message=${encodeURIComponent('Email confirmation failed. Please try signing in or request a new confirmation email.')}`
      );
    }

    if (data.user) {
      if (type === 'recovery') {
        redirect(
          '/update-password?message=' + encodeURIComponent('Please enter your new password below.')
        );
      } else if (type === 'signup' || type === 'email_change') {
        await updateProfileFromMetadata(data.user.id, data.user.user_metadata);

        const successMessage = 'Email confirmed successfully! Welcome to ImageForge.';
        const redirectUrl = next.startsWith('/') ? next : '/';
        redirect(`${redirectUrl}?message=${encodeURIComponent(successMessage)}`);
      } else {
        redirect(`/?message=${encodeURIComponent('Email confirmed successfully!')}`);
      }
    }
  }
  redirect(
    '/error?message=' +
      encodeURIComponent(
        'Invalid confirmation link. Please try signing in or request a new confirmation email.'
      )
  );
}

async function updateProfileFromMetadata(userId: string, metadata: UserMetadata) {
  if (!metadata?.first_name || !metadata?.last_name) {
    return;
  }

  const supabase = await createSupabaseServerClient();

  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        first_name: metadata.first_name,
        last_name: metadata.last_name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error(' Profile update error:', error);
    }
  } catch (err) {
    console.error('Profile update failed:', err);
  }
}
