import axios from "axios";
import { getSubmarinedContent } from "../../../helpers/submarine";
import { getUserContentCombo } from "../../../repositories/content";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      if (!req.body.shortId) {
        return res.status(404).send("Please provide a shortId");
      }

      if (req.body.offset === null || req.body.offset === undefined) {
        return res.status(404).send("Please provide an offset");
      }

      if (!req.body.accessToken) {
        return res.status(404).send("No access token");
      }

      if (!req.body.gatewayURL) {
        return res.status(404).send("No gateway URL provided");
      }

      await axios.get(`${req.body.gatewayURL}?accessToken=${req.body.accessToken}`);

      const info = await getUserContentCombo(req.body.shortId);

      const { submarine_cid } = info;
      const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
      const responseObj = await getSubmarinedContent(
        pinata_submarine_key,
        submarine_cid,
        pinata_gateway_subdomain,
        req.body.offset
      );

      return res.status(200).json(responseObj);
    }
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    return res.status(fetchResponse?.status || 500).json(error.data);
  }
}
