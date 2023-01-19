import { TwitterApi } from "twitter-api-v2";
import { getSubmarinedContent } from "../../../../helpers/submarine";
import { withSessionRoute } from "../../../../helpers/withSession";
import { getUserContentCombo } from "../../../../repositories/content";

type Session = {
  oauth_token: string;
  oauth_secret: string;
};
const handler = async (req, res) => {
  // allow CORS on this method
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method === "POST") {
    try {
      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY || "",
        appSecret: process.env.CONSUMER_SECRET || "",
      });
      const authLink = await client.generateAuthLink(
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.CONSUMER_CALLBACK}`
      );
      const obj = {
        oauth_token: authLink.oauth_token,
        oauth_secret: authLink.oauth_token_secret,
      };
      const payload: Session = { ...obj };
      req.session.twitterOauth = payload;
      await req.session.save();
      res.json({ url: authLink.url });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      const { oauth_verifier, shortId } = req.query;
      const { oauth_token, oauth_secret } = req.session.twitterOauth;

      // TS sanity check
      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY || "",
        appSecret: process.env.CONSUMER_SECRET || "",
        accessToken: oauth_token,
        accessSecret: oauth_secret,
      });
      const loginResult = await client.login(oauth_verifier).catch((err) => {
        res.status(401).send("Invalid tokens");
        return;
      });
      if (loginResult) {
        const loggedClient = loginResult.client;
        const userId = await loggedClient.v1.verifyCredentials();
        const info = await getUserContentCombo(shortId);
        if (!info) {
          return res.status(404).send("No content found");
        }
        const { unlock_info, submarine_cid } = info;
        const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;
        const { type } = unlock_info;
        if (type === "retweet") {
          const { tweetUrl } = unlock_info;
          const tweetId = tweetUrl.split("status/")[1].split("?")[0];
          const allRetweetsData = await loggedClient.v2.tweetRetweetedBy(tweetId);
          const allRetweets = await allRetweetsData.data;
          const retweeted = allRetweets.find((r) => r.username === userId.screen_name);
          if (!retweeted) {
            console.log("not retweeted");
            return res.status(401).send("Unauthorized, you didn't retweet.");
          }

          if (!pinata_submarine_key || !pinata_gateway_subdomain) {
            return res.status(401).send("No submarine key found");
          }
          const responseObj = await getSubmarinedContent(
            pinata_submarine_key,
            submarine_cid,
            pinata_gateway_subdomain
          );
          return res.json(responseObj);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
};

export default withSessionRoute(handler);
