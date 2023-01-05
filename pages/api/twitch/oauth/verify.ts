import { getSubmarinedContent } from "../../../../helpers/submarine";
import { getUserContentCombo } from "../../../../repositories/content";
import ky from "ky";
import { v4 as uuidv4 } from "uuid";
import { withSessionRoute } from "../../../../helpers/withSession";

type Session = {
  id: string;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { accessToken, shortId, state } = req.body;
    const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENTID;
    try {
      const session: Session = req.session.state;
      const { id } = session;
      if (id !== state) {
        res.status(403).send("This is a forbidden action");
        return;
      }
      const info = await getUserContentCombo(shortId).catch((err) => {
        res.status(404).send("User content not found.");
        return;
      });
      if (info) {
        const { submarine_cid, unlock_info } = info;
        const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
        const responseObj = await getSubmarinedContent(
          pinata_submarine_key,
          submarine_cid,
          pinata_gateway_subdomain
        );
        if (unlock_info.type == "twitch") {
          const user = await ky.get(`https://api.twitch.tv/helix/users`, {
            headers: {
              "Client-ID": `${clientId}`,
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const user_data = await user.json();
          const user_id = user_data.data[0].id;
          const broadcaster = await ky.get(
            `https://api.twitch.tv/helix/users?login=${unlock_info.loginName}`,
            {
              headers: {
                "Client-ID": `${clientId}`,
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const broadcaster_data = await broadcaster.json();
          const broadcaster_id = broadcaster_data.data[0].id;
          const isSubscribed = await ky
            .get(
              `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${broadcaster_id}&user_id=${user_id}`,
              {
                headers: {
                  "Client-ID": `${clientId}`,
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .catch((err) => {
              res.status(404).send("User is not subscribed to this broadcaster.");
              return;
            });
          if (isSubscribed && isSubscribed.status === 200) {
            return res.json(responseObj);
          }
        }
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else if (req.method === "GET") {
    const payload: Session = { id: uuidv4() };
    req.session.state = payload;
    await req.session.save();
    res.status(200).json(payload);
    return;
  }
};

export default withSessionRoute(handler);
