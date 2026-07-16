"use strict";

const SUPABASE_URL =
  "https://afwofkpyuklmmobydres.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_8xxzpfCYwFiKO_zV6hU4Nw_ZTgl_brt";

if (!window.supabase) {
  throw new Error("Supabase kütüphanesi yüklenemedi.");
}

window.niyetSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
