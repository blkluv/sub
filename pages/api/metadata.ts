import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";
import { getSupabaseClient } from "../../helpers/supabase";
import { getUserSession } from "../../helpers/user.helpers";
import { definitions } from "../../types/supabase";

const supabase = getSupabaseClient();
const schema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(400).required(),
  thumbnail: Joi.string().min(0).max(100).optional().allow(null, ""),
  submarineCID: Joi.string().min(1).max(100).required(),
  unlockInfo: Joi.object({
    type: Joi.string().min(1).max(100).required(),
    contract: Joi.string().min(1).max(100).optional().allow(null, ""),
    updateAuthority: Joi.string().min(1).max(100).optional().allow(null, ""),
    mintAddress: Joi.string().min(1).max(100).optional().allow(null, ""),
    network: Joi.string().min(1).max(100).allow(null, ""),
    blockchain: Joi.string().min(1).max(100).allow(null, ""),
    tokenId: Joi.string().min(1).max(100).optional().allow(null, ""),
    tweetUrl: Joi.string().min(1).max(100).optional().allow(null, ""),
    lat: Joi.number().optional().allow(null, ""),
    long: Joi.number().optional().allow(null, ""),
    distance: Joi.number().min(0).max(6000).optional().allow(null, ""),
  }).required(),
  customizations: Joi.object({
    backgroundCid: Joi.string().min(1).max(100).optional().allow(null, ""),
    buttonColor: Joi.object().optional().allow(null, ""),
    buttonTextColor: Joi.object().optional().allow(null, ""),
    buttonShape: Joi.string().min(1).max(100).optional().allow(null, ""),
    fontFamily: Joi.string().min(1).max(100).optional().allow(null, ""),
    logoCid: Joi.string().min(1).max(100).optional().allow(null, ""),
  }).optional(),
  shortId: Joi.string().min(1).max(100).required(),
});

export default async function handler(req, res) {
  const user = await getUserSession(req.headers.authorization);

  if (!user) {
    res.status(401).send("Unauthorized");
  }
  if (req.method === "POST") {
    try {
      const obj = JSON.parse(req.body || {});
      await schema.validateAsync(obj);
      const theCreationObject: definitions["Content"] = {
        id: uuidv4(),
        name: obj.name,
        description: obj.description,
        submarine_cid: obj.submarineCID,
        short_id: obj.shortId,
        pinata_user_id: user.userInformation.id,
        unlock_info: obj.unlockInfo,
        customizations: obj.customizations,
        thumbnail: obj.thumbnail,
      };
      // if (req.body.thumbnail && req.body.thumbnail.length > 0) {
      //   console.log("Adding thumbnail");
      //   theCreationObject.thumbnail = req.body.thumbnail;
      // }
      const { error } = await supabase
        .from<definitions["Content"]>("Content")
        .insert([theCreationObject]);

      if (error) {
        throw error;
      }

      res.status(200).json({ result: "success" });
    } catch (error) {
      console.log("Error for: ");
      console.log(user);
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      await schema.validateAsync(req.body);
      console.log("validation success");

      const theCreationObject: Omit<definitions["Content"], "id"> = {
        name: req.body.name,
        description: req.body.description,
        submarine_cid: req.body.submarineCID,
        short_id: req.body.shortId,
        pinata_user_id: user.userInformation.id,
        unlock_info: req.body.unlockInfo,
        customizations: req.body.customizations,
        thumbnail: req.body.thumbnail,
      };

      // if (req.body.thumbnail && req.body.thumbnail.length > 0) {
      //   console.log("Adding thumbnail");
      //   theCreationObject.thumbnail = req.body.thumbnail;
      // }

      const { data, error } = await supabase
        .from<definitions["Content"]>("Content")
        .update(theCreationObject)
        .eq("short_id", req.body.shortId);

      if (error) {
        throw error;
      }

      res.status(200).json({ result: "success" });
    } catch (error) {
      console.log("Error for: ");
      console.log(user);
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      const { offset } = req.query;

      let { data: Content, error } = await supabase
        .from<definitions["Content"]>("Content")
        .select("*")
        .eq("pinata_user_id", user.userInformation.id)
        .range(offset, offset + 4)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      return res.status(200).json(Content);
    } catch (error) {
      console.log("Error for: ");
      console.log(error);
      const { response: fetchResponse } = error;
      return res.status(fetchResponse?.status || 500).json(error.data);
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    if (!id || !uuidValidate(id)) {
      return res.status(401).send("No valid id passed in");
    } else {
      const { data, error } = await supabase
        .from<definitions["Content"]>("Content")
        .delete()
        .eq("id", id)
        .eq("pinata_user_id", user.userInformation.id);

      if (error) {
        throw error;
      }

      return res.status(200).json({ result: "success" });
    }
  } else {
    return res.status(200).json({
      message: "This is the way...wait, no it is not. What are you doing here?",
    });
  }
}
