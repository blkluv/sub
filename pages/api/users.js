import axios from 'axios';
import {createAPIKey, getUserSession, findAPIKeys} from '../helpers/user.helpers';
//  THIS FILE IS WHERE WE WILL POST THE METADATA ASSOCIATED WITH A USER'S SUBMARINED CONTENT:
const models = require('../../db/models/index');
//these are the things we need to return
//we'll need to store this data for each file as well, and associate a customer with this data.

//  * Name
//  * Description
//  * Thumbnail CID
//  * Unlock info
//  * Customer API Key

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
      //Example req.body:

      console.log(models);
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
            pinata_submarine_key: newKey
          })
        }
      }

      res.status(200).json({ message: 'user exists with valid key' })

      // {
      //   id: 'e3xc8NnhTE541XRzBkiZoM',
      //   name: 'Zombie State Podcast',
      //   thumbnail: 'QmZp1re5P9YzUo5v5zFhK2CdeskHyn8ZiwghUXTcSCNzAe',
      //   lockInfo: {
      //     type: 'nft',
      //     contract: '0xdB2448d266d311D35f56c46dD43884B7FEeea76b',
      //     network: { id: 1, name: 'ETH - Mainnet' }
      //   },
      //   tweetUrl: '',
      //   network: { id: 1, name: 'ETH - Mainnet' },
      //   cid: 'bafkreigxdzpom7s56nfw2etcuacy5mlfkwuz6uailsxcglnkjeqxsrjeze',
      //   submarineApiKey: 'vhdhs8j274675753'
      // }

      // const pinataUserId = user.userInformation.id;
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
}