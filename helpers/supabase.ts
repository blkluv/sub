import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (client) {
    return client;
  }
  const supabaseUrl = process.env.SUPABASE_ENDPOINT || "https://kabuzibvkgxaowgjoewz.supabase.co";
  const supabaseKey = process.env.SUPABASE_SECRET || "";
  client = createClient(supabaseUrl, supabaseKey);
  return client;
};
