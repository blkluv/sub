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

    const data = await getUserContentCombo(req.query.shortId);
    if (!data) {
      return res.status(404).send("No content found");
    }
    const returnObject = {
      id: data.id,
      name: data.name,
      description: data.description,
      thumbnail: data.thumbnail,
      submarineCID: data.submarine_cid,
      unlockInfo: data.unlock_info,
      shortId: data.short_id,
      customizations: data.customizations,
      gatewayUrl: data.Users.pinata_gateway_subdomain,
    };

    return res.status(200).json(returnObject);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 404).json(error.data);
  }
}
