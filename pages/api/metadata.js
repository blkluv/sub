import axios from "axios";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kabuzibvkgxaowgjoewz.supabase.co";
const supabaseKey = process.env.SUPABASE_SECRET;
const supabase = createClient(supabaseUrl, supabaseKey);

const getUserSession = async (auth) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`,
      {
        headers: {
          Authorization: auth,
          source: "login",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = await getUserSession(req.headers.authorization);
      if (!user) {
        res.status(401).send("Unauthorized");
      }
      const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(256).required(),
        thumbnail: Joi.string().min(1).max(100).optional(),
        submarineCid: Joi.string().min(1).max(100).required(),
        unlockInfo: Joi.object({
          type: Joi.string().min(1).max(100).required(),
          contract: Joi.string().min(1).max(100).required(),
          network: Joi.string().min(1).max(100).required(),
        }).required(),
        shortId: Joi.string().min(1).max(100).required(),
      });

      try {
        await schema.validateAsync(req.body);
        console.log("validation success");
      } catch (err) {
        throw err;
      }

      const theCreationObject = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        submarine_cid: req.body.submarineCid,
        short_id: req.body.shortId,
        pinata_user_id: user.userInformation.id,
        unlock_info: req.body.unlockInfo,
      };

      if (req.body.thumbnail) {
        theCreationObject.thumbnail = req.body.thumbnail;
      }

      const { data, error } = await supabase
      .from('Content')
      .insert([
        theCreationObject,
      ]);

      if(error) {
        throw error;
      }

      res.status(200).json({ result: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const user = await getUserSession(req.headers.authorization);
      if (!user) {
        res.status(401).send("Unauthorized");
      }

      let { data: Content, error } = await supabase
      .from('Content')
      .select('*')
      .eq('pinata_user_id', user.userInformation.id)
      
      if(error) {
        throw error;
      }
      console.log(Content);
      res.status(200).json(Content);
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else if (req.method === "DELETE") {
    const user = await getUserSession(req.headers.authorization);
    if (!user) {
      res.status(401).send("Unauthorized");
    }

    if (!req.body.id || !uuidValidate(req.body.id)) {
      res.status(401).send("No valid id passed in");
    } else {

      const { data, error } = await supabase
      .from('Content')
      .delete()
      .eq('id', req.body.id)
      .eq('pinata_user_id', user.userInformation.id)

      if(error) {
        throw error;
      }

      res.status(200).json({ result: "success" });
    }
  } else {
    res
      .status(200)
      .json({
        message:
          "This is the way...wait, no it is not. What are you doing here?",
      });
  }
}
