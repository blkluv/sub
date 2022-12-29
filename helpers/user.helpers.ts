import axios from "axios";
import { NextApiRequest } from "next";

export interface UserInformation {
  id: string;
  email: string;
  email_verified: boolean;
  pin_policy: PinPolicy;
  mfa_enabled: boolean;
  feature_flags?: any;
  status: string;
  scheduledToBeCancelledAt?: any;
}

export interface Region {
  id: string;
  desiredReplicationCount: number;
}

export interface PinPolicy {
  regions: Region[];
  version: number;
}

export const getUserSession = async (
  req: NextApiRequest
): Promise<{ userInformation: UserInformation }> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`, {
      headers: {
        Authorization: req.headers.authorization,
        source: req.headers.source ? "login" : "",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createAPIKey = async (req): Promise<Key> => {
  try {
    const newKeyResults = await axios.post(
      `${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`,
      {},
      {
        headers: {
          authorization: req.headers.authorization,
          source: "login",
        },
      }
    );
    return newKeyResults.data.key;
  } catch (error) {
    throw error;
  }
};

interface Key {
  created_at: Number;
  id: string;
  key: string;
}

export const findAPIKeys = async (req): Promise<Key[]> => {
  try {
    const hasKeyResults = await axios.get(
      `${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys?offset=0&limit=undefined`,
      {
        headers: {
          authorization: req.headers.authorization,
          source: "login",
        },
      }
    );
    return hasKeyResults.data.items;
  } catch (error) {
    throw error;
  }
};
