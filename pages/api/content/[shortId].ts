import { getUserContentCombo } from "../../../repositories/content";
import { Customizations, UnlockInfo } from "../../../types/UnlockInfo";

export interface getContentReturnObject {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  submarineCID: string;
  unlockInfo: UnlockInfo;
  shortId: string;
  customizations: Customizations;
  gatewayUrl: string;
}
export default async function handler(req, res) {
  try {
    if (!req.query.shortId) {
      return res.status(401).send("Please provide a shortId");
    }

    const theContent = await getUserContentCombo(req.query.shortId);
    const returnObject = {
      id: theContent.id,
      name: theContent.name,
      description: theContent.description,
      thumbnail: theContent.thumbnail,
      submarineCID: theContent.submarine_cid,
      unlockInfo: theContent.unlock_info,
      shortId: theContent.short_id,
      customizations: theContent.customizations,
      gatewayUrl: theContent.Users.pinata_gateway_subdomain,
    };

    return res.status(200).json(returnObject);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 404).json(error.data);
  }
}
