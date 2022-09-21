import { getSubmarinedContent } from "../../../helpers/submarine";
import { getUserContentCombo } from "../../../helpers/verify.helpers";

function getDistanceFrom(lon1, lat1, lon2, lat2) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon))) /
      2;

  //Convert km to miles
  return R * 2 * Math.asin(Math.sqrt(a)) * 0.621371;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userLat, userLong, shortId } = req.body;

      const info = await getUserContentCombo(shortId);

      const { unlock_info, submarine_cid, Users } = info;
      console.log({ info });
      const { lat, long, distance } = unlock_info;
      const { pinata_submarine_key, pinata_gateway_subdomain } = Users;
      const distanceFrom = getDistanceFrom(userLong, userLat, long, lat);

      if (distanceFrom > parseFloat(distance)) {
        return res.status(401).send("Not in the right location");
      }

      const responseObj = await getSubmarinedContent(
        pinata_submarine_key,
        submarine_cid,
        pinata_gateway_subdomain
      );
      return res.json(responseObj);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
