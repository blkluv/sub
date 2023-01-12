import { getSupabaseClient } from "../helpers/supabase";
import { definitions } from "../types/supabase";
import { Customizations, UnlockInfo } from "../types/UnlockInfo";

interface ContentWithUnlockInfo
  extends Omit<definitions["Content"], "unlock_info" | "customizations"> {
  unlock_info: UnlockInfo;
  customizations?: Customizations;
}
const supabase = getSupabaseClient();

type UserContentCombo = ContentWithUnlockInfo & { Users: definitions["Users"] };

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

export const getAllContentIds = async (): Promise<string[]> => {
  let { data: Content, error } = await supabase
    .from<definitions["Content"]>("Content")
    .select("short_id");

  if (!Content) {
    throw "Couldn't find content";
  }
  return Content.map((c) => c.short_id);
};
