import axios from 'axios';
import {createAPIKey, getGateways, getUserSession, findAPIKeys} from '../../helpers/user.helpers';
const models = require('../../db/models/index');

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
        res.status(401).send("Unauthorized");
      }

      const submarineMeUser = await models.users.findByPk(user.userInformation.id);
      if(!submarineMeUser) {
        const APIKeys = await findAPIKeys(req);
        let theAPIKey;
        if(!APIKeys || APIKeys.length < 1) {
          const createKeyResults = await createAPIKey(req);
          theAPIKey = createKeyResults.key.key
        } else {
          theAPIKey = APIKeys[0].key;
        }
        await models.users.create({
          pinata_user_id: user.userInformation.id,
          pinata_submarine_key: theAPIKey
        })
      } else {
        //we have a user, awesome. Now we need to check if the key is valid
        const existingKeys = await findAPIKeys(req);
        const currentAPIKey = submarineMeUser.key;
        const match = existingKeys.find(key => {
          return key === currentAPIKey
        });
        if(!match) {
          //we need to update the API key or else things won't work on submarine.me
          const newKey = await createAPIKey(req);
          await submarineMeUser.update({
            pinata_submarine_key: newKey.key
          })
        }
      }

      const gateways = await getGateways(req);
      if(!gateways || !gateways.items || !gateways.items.rows || gateways.items.rows.length < 1) {
        res.status(400).send("User Has No Gateways");
      } else {
        await submarineMeUser.update({
          pinata_gateway_subdomain: gateways.items.rows[0].domain
        })
      }

      res.status(200).json({ message: 'user exists with valid key' })
      
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
}