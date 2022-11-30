import { definitions } from "../types/supabase";
import { getSupabaseClient } from "../helpers/supabase";

const supabase = getSupabaseClient();

export const getOauthSecret = async (oauth_token) => {
  try {
    let { data, error } = await supabase
      .from<definitions["Twitter"]>("Twitter")
      .select("oauth_secret")
      .eq("oauth_token", oauth_token);

    if (error) {
      throw error;
    }

    if (!data || !data[0]) {
      throw "Couldn't find token";
    }

    return data[0];
  } catch (error) {
    throw error;
  }
};
