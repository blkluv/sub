import { getSubmarinedContent } from "../../../../helpers/submarine";
import { getUserContentCombo } from "../../../../repositories/content";
import ky from "ky";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { accessToken, shortId, loginName } = req.body;
    const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENTID;
    try {
      const user = await ky.get(`https://api.twitch.tv/helix/users`, {
        headers: {
          "Client-ID": `${clientId}`,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user_data = await user.json();
      const user_id = user_data.data[0].id;
      const broadcaster = await ky.get(`https://api.twitch.tv/helix/users?login=${loginName}`, {
        headers: {
          "Client-ID": `${clientId}`,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const broadcaster_data = await broadcaster.json();
      const broadcaster_id = broadcaster_data.data[0].id;
      const isSubscribed = await ky.get(
        `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcaster_id}&user_id=${user_id}`,
        {
          headers: {
            "Client-ID": `${clientId}`,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (isSubscribed.status === 200) {
        const info = await getUserContentCombo(shortId);
        const { submarine_cid } = info;
        const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
        const responseObj = await getSubmarinedContent(
          pinata_submarine_key,
          submarine_cid,
          pinata_gateway_subdomain
        );
        return res.json(responseObj);
      } else {
        res.status(401).send("User is not a subscriber");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

export default handler;
