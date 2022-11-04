import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createAPIKey, getUserSession, findAPIKeys } from "../../helpers/user.helpers";
import { getSupabaseClient } from "../../helpers/supabase";
import { definitions } from "../../types/supabase";

const supabase = getSupabaseClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  } else if (req.method === "GET") {
    let user = null;
    try {
      user = await getUserSession(req.headers.authorization);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      let { data: Users, error } = await supabase
        .from<definitions["Users"]>("Users")
        .select("*")
        .eq("pinata_user_id", user.userInformation.id);

      if (error) {
        throw error;
      }

      const submarineMeUser = Users[0];
      console.log({ userFromPinata: user });
      console.log({ Users });
      console.log({ submarineMeUser });
      if (!submarineMeUser || Users.length === 0) {
        const APIKeys = await findAPIKeys(req);
        let theAPIKey;
        if (!APIKeys || APIKeys.length < 1) {
          console.log("Creating API key for user: ");
          console.log(user);
          const createKeyResults = await createAPIKey(req);
          theAPIKey = createKeyResults.key;
        } else {
          theAPIKey = APIKeys[0].key;
        }

        const { data, error } = await supabase.from<definitions["Users"]>("Users").insert([
          {
            id: uuidv4(),
            pinata_user_id: user.userInformation.id,
            pinata_submarine_key: theAPIKey,
          },
        ]);

        if (error) {
          console.log(error);
          throw error;
        }
      } else {
        const existingKeys = await findAPIKeys(req);
        console.log({ existingKeys });
        if (existingKeys.length > 0 && submarineMeUser.pinata_submarine_key) {
          const currentAPIKey = submarineMeUser.pinata_submarine_key;
          const match = existingKeys.find((keyObj) => {
            return keyObj.key === currentAPIKey;
          });
          if (!match) {
            const newKey = await createAPIKey(req);

            const { data, error } = await supabase
              .from<definitions["Users"]>("Users")
              .update({ pinata_submarine_key: newKey.key })
              .eq("pinata_user_id", user.userInformation.id);

            if (error) {
              throw error;
            }
          }
        } else if (existingKeys.length > 0) {
          const { data, error } = await supabase
            .from("Users")
            .update({ pinata_submarine_key: existingKeys[0].key })
            .eq("pinata_user_id", user.userInformation.id);

          if (error) {
            throw error;
          }
        } else {
          const newKey = await createAPIKey(req);

          const { data, error } = await supabase
            .from<definitions["Users"]>("Users")
            .update({ pinata_submarine_key: newKey.key })
            .eq("pinata_user_id", user.userInformation.id);

          if (error) {
            throw error;
          }
        }
      }

      const gateways = await getGateways(req);
      if (!gateways || !gateways.items || !gateways.items.rows || gateways.items.rows.length < 1) {
        return res.status(403).send("User Has No Gateways");
      } else {
        const { data, error } = await supabase
          .from("Users")
          .update({ pinata_gateway_subdomain: gateways.items.rows[0].domain })
          .eq("pinata_user_id", user.userInformation.id);

        if (error) {
          throw error;
        }
      }

      return res.status(200).json(submarineMeUser);
    } catch (error) {
      console.log("Error for: ");
      console.log(user);
      console.log(error);
      const { response: fetchResponse } = error;
      return res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else {
    return res
      .status(501)
      .json({ message: "This is the way...wait, no it is not. What are you doing here?" });
  }
}

const getGateways = async (req): Promise<Gateways> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_MANAGED_API}/gateways?page=1`, {
      headers: {
        authorization: req.headers.authorization,
        source: "login",
      },
    });
    console.log(JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    throw error;
  }
};

interface Row {
  id: string;
  domain: string;
  createdAt: Date;
  restrict: boolean;
  customDomains: any[];
}

interface Items {
  count: number;
  rows: Row[];
}

interface Gateways {
  status: number;
  count: number;
  items: Items;
}
