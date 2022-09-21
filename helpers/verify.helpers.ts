import { definitions } from "../types/supabase";
import { getSupabaseClient } from "./supabase";

const supabase = getSupabaseClient();

type UserContentCombo = definitions["Content"] & { Users: definitions["Users"] };

export const getUserContentCombo = async (shortId): Promise<UserContentCombo> => {
  try {
    let { data: Content, error } = await supabase
      .from<UserContentCombo>("Content")
      .select(`*, Users (pinata_user_id, pinata_submarine_key, pinata_gateway_subdomain)`)
      .eq("short_id", shortId);

    if (!Content || !Content[0]) {
      throw "Couldn't find content";
    }

    return Content[0];
  } catch (error) {
    throw error;
  }
};

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
