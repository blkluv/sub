import { definitions } from "../types/supabase";
import { getSupabaseClient } from "./supabase";

const supabase = getSupabaseClient();

interface Hsl {
  a: number;
  h: number;
  l: number;
  s: number;
}

interface Hsv {
  a: number;
  h: number;
  s: number;
  v: number;
}

interface Rgb {
  a: number;
  b: number;
  g: number;
  r: number;
}

interface ButtonColor {
  hex: string;
  hsl: Hsl;
  hsv: Hsv;
  rgb: Rgb;
  oldHue: number;
  source: string;
}

interface Customizations {
  backgroundCid?: string;
  fontFamily?: string;
  buttonColor?: ButtonColor;
  buttonShape?: string;
  logoCid?: string;
}
type UnlockInfoRetweet = {
  type: "retweet";
  network?: any;
  tokenId: string;
  contract: string;
  tweetUrl: string;
  blockchain: string;
  mintAddress: string;
  updateAuthority: string;
};

type UnlockInfoNFT = {
  type: "nft";
  network: string;
  contract: string;
};

type UnlockInfoLocation = {
  lat: number;
  long: number;
  type: "location";
  distance: string;
};
export type UnlockInfo = UnlockInfoRetweet | UnlockInfoNFT | UnlockInfoLocation;

export interface ContentWithUnlockInfo
  extends Omit<definitions["Content"], "unlock_info" | "customizations"> {
  unlock_info: UnlockInfo;
  customizations?: Customizations;
}

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
