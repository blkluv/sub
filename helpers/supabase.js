import { createClient } from "@supabase/supabase-js";

let client = null

export const getSupabaseClient = () => {
    if (client) {
        return client
    }
    const supabaseUrl = process.env.SUPABASE_ENDPOINT || "https://kabuzibvkgxaowgjoewz.supabase.co";
    const supabaseKey = process.env.SUPABASE_SECRET;
    client = createClient(supabaseUrl, supabaseKey);
    return client
}