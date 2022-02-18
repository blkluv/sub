import axios from 'axios';

//  THIS FILE IS WHERE WE WILL POST THE METADATA ASSOCIATED WITH A USER'S SUBMARINED CONTENT: 

//these are the things we need to return
//we'll need to store this data for each file as well, and associate a customer with this data.

//  * Name
//  * Description 
//  * Thumbnail CID
//  * Unlock info
//  * Customer API Key

const getUserSession = async (auth) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`, {
      headers: {
        Authorization: auth, 
        source: 'login'
      }
    });
    return res.data; 
  } catch (error) {
    throw error;
  }
}

export default async function handler(req, res) {
  if(req.method === "POST") {
    try {  
      const user = await getUserSession(req.headers.authorization);
      if(!user) {
        res.status(401).send("Unauthorized");
      }
      //Example req.body: 

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

      const pinataUserId = user.userInformation.id;

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }    
  } else if(req.method === "GET") {
    try {
      
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
}