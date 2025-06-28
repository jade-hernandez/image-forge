export { createSupabaseBrowserClient as createBrowserClient } from './client';
export { updateSession } from './middleware';
export { createSupabaseServerClient } from './server';

export type {
  Database,
  UserProfile,
  UserProfileInsert,
  UserProfileUpdate,
} from './database-gen.types';
