import {createAPIKey, getGateways, getUserSession, findAPIKeys} from '../../helpers/user.helpers';
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kabuzibvkgxaowgjoewz.supabase.co";
const supabaseKey = process.env.SUPABASE_SECRET;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if(req.method === "POST") {
    try {

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else if(req.method === "GET") {
    try {
      const user = await getUserSession(req.headers.authorization);
      if(!user) {
        return res.status(401).send("Unauthorized");
      }


      let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
      .eq('pinata_user_id', user.userInformation.id);
      
      if(error) {
        throw error;
      }

      const submarineMeUser = Users[0];
      console.log({Users});
      console.log({submarineMeUser});
      if(!submarineMeUser) {
        const APIKeys = await findAPIKeys(req);
        let theAPIKey;
        if(!APIKeys || APIKeys.length < 1) {
          const createKeyResults = await createAPIKey(req);
          theAPIKey = createKeyResults.key.key
        } else {
          theAPIKey = APIKeys[0].key;
        }


        const { data, error } = await supabase
        .from('Users')
        .insert([
          { id: uuidv4(), pinata_user_id: user.userInformation.id, pinata_submarine_key: theAPIKey },
        ])

        if(error) {
          throw error;
        }
      } else {        
        const existingKeys = await findAPIKeys(req);
        if(existingKeys.length > 0 && submarineMeUser.key) {
          const currentAPIKey = submarineMeUser.key;
          const match = existingKeys.find(key => {
            return key === currentAPIKey
          });
          if(!match) {          
            const newKey = await createAPIKey(req);
  
            const { data, error } = await supabase
            .from('Users')
            .update({ 'pinata_submarine_key': newKey.key })
            .eq('pinata_user_id', user.userInformation.id)
            
            if(error) {
              throw error;
            }
          }
        } else if(existingKeys.length > 0) {
          const { data, error } = await supabase
          .from('Users')
          .update({ 'pinata_submarine_key': existingKeys[0].key })
          .eq('pinata_user_id', user.userInformation.id)
          
          if(error) {
            throw error;
          }
        } else {
          const newKey = await createAPIKey(req);

          const { data, error } = await supabase
          .from('Users')
          .update({ 'pinata_submarine_key': newKey.key })
          .eq('pinata_user_id', user.userInformation.id)
          
          if(error) {
            throw error;
          }
        }        
      }

      const gateways = await getGateways(req);
      if(!gateways || !gateways.items || !gateways.items.rows || gateways.items.rows.length < 1) {
        return res.status(400).send("User Has No Gateways");
      } else {

        const { data, error } = await supabase
          .from('Users')
          .update({ 'pinata_gateway_subdomain': gateways.items.rows[0].domain })
          .eq('pinata_user_id', user.userInformation.id)
          
        if(error) {
          throw error;
        }
      }

      return res.status(200).json({ message: 'user exists with valid key' })
      
    } catch (error) {
      console.log("Error for: ");
      console.log(user);
      console.log(error);
      const { response: fetchResponse } = error
      return res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    return res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
}