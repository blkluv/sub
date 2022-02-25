import axios from "axios";
import models from '../db/models/index' ;
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kabuzibvkgxaowgjoewz.supabase.co";
const supabaseKey = process.env.SUPABASE_SECRET;
const supabase = createClient(supabaseUrl, supabaseKey);

// api will need to be updated to get specific gateways

export const getUserContentCombo = async (shortId) => {
  try {

    let { data: Content, error } = await supabase
    .from('Content')
    .select(`
      *,
      Users (
        pinata_user_id, pinata_submarine_key, pinata_gateway_subdomain
      )
    `)
    .eq("short_id", shortId);
    
    if(!Content || !Content[0]) {
      throw "Couldn't find content";
    }

    console.log(Content);
  
    // const contentWithUser = await models.content.findOne({
    //   where: {
    //     short_id: shortId
    //   },
    //   include: [
    //     {
    //       model: models.users
    //     }
    //   ]
    // });
    return Content[0];
  } catch (error) {
    throw error;
  }
}