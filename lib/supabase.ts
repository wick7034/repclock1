import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const disabled = process.env.NEXT_PUBLIC_SUPABASE_DISABLED === 'true';

export const supabase =
  url && anonKey && !disabled
    ? createClient(url, anonKey)
    : null;

export function isSupabaseConfigured(): boolean {
  return !!url && !!anonKey && !disabled;
}
