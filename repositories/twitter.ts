import { definitions } from "../types/supabase";
import { getSupabaseClient } from "../helpers/supabase";
import { Customizations, UnlockInfo } from "../types/UnlockInfo";

const supabase = getSupabaseClient();

type UserContentCombo = ContentWithUnlockInfo & { Users: definitions["Users"] };

interface ContentWithUnlockInfo
  extends Omit<definitions["Content"], "unlock_info" | "customizations"> {
  unlock_info: UnlockInfo;
  customizations?: Customizations;
}

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

export const getUserContentCombo = async (shortId): Promise<UserContentCombo> => {
  let { data: Content, error } = await supabase
    .from<UserContentCombo>("Content")
    .select(`*, Users (pinata_user_id, pinata_submarine_key, pinata_gateway_subdomain)`)
    .eq("short_id", shortId);

  if (!Content || !Content[0]) {
    throw "Couldn't find content";
  }
  return Content[0];
};
