import axios from 'axios';
import models from '../../db/models/index' ;
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

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
      const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(256).required(),
        thumbnail: Joi.string().min(1).max(100),
        submarineCid: Joi.string().min(1).max(100).required(),
        unlockInfo: Joi.object({
          type: Joi.string().min(1).max(100).required(),
          contract: Joi.string().min(1).max(100).required(),
          network: Joi.string().min(1).max(100).required(),
        }).required(),
        shortId: Joi.string().min(1).max(100).required(),
      });

      try {
        const validateResults = await schema.validateAsync(req.body);
        console.log('validation success');
      }
      catch (err) {
        throw err;
      }

      const theCreationObject = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        submarine_cid: req.body.submarineCid,
        short_id: req.body.shortId,
        pinata_user_id: user.userInformation.id,
        unlock_info: req.body.unlockInfo
      };

      if(req.body.thumbnail) {
        theCreationObject.thumbnail = req.body.thumbnail
      }

      await models.content.create(theCreationObject);
      res.status(200).json({ message: 'success' });

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
      const queryOptions = {
        order: [['createdAt', 'DESC']],
        limit: 10,
        offset: 0
      };
      if(req.query.offset && Number.isInteger(req.query.offset)){
        queryOptions.offset = req.query.offset
      }

      const queryResults = await models.content.findAll(queryOptions);
      res.status(200).json(queryResults);

    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
}