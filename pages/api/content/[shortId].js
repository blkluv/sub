import { getSupabaseClient } from "../../helpers/supabase";

const supabase = getSupabaseClient();

export default async function handler(req, res) {
  try {
    if (!req.query.shortId) {
      return res.status(401).send("Please provide a shortId");
    }

    let { data: Content, error } = await supabase
      .from("Content")
      .select("*")
      .eq("short_id", req.query.shortId);

    if (error) {
      throw error;
    }

    if (!Content || !Content[0]) {
      throw "Couldn't find content";
    }

    const theContent = Content[0];

    const returnObject = {
      id: theContent.id,
      name: theContent.name,
      description: theContent.description,
      thumbnail: theContent.thumbnail,
      submarineCID: theContent.submarine_cid,
      unlockInfo: theContent.unlock_info,
      shortId: theContent.short_id,
      customizations: theContent.customizations,
    };

    return res.status(200).json(returnObject);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
}
