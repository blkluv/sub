import { TwitterApi } from "twitter-api-v2";
import { getSubmarinedContent } from "../../../../helpers/submarine";
import { getSupabaseClient } from "../../../../helpers/supabase";
import { getUserContentCombo } from "../../../../repositories/content";
import { getOauthSecret } from "../../../../repositories/twitter";
import { definitions } from "../../../../types/supabase";

const supabase = getSupabaseClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY,
        appSecret: process.env.CONSUMER_SECRET,
      });
      const authLink = await client.generateAuthLink(
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.CONSUMER_CALLBACK}`
      );
      const obj = {
        oauth_token: authLink.oauth_token,
        oauth_secret: authLink.oauth_token_secret,
      };
      await supabase.from<definitions["Twitter"]>("Twitter").insert([obj]);
      res.json({ url: authLink.url });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      const { oauth_token, oauth_verifier, shortId } = req.query;
      const { oauth_secret } = await getOauthSecret(oauth_token);

      // TS sanity check
      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY,
        appSecret: process.env.CONSUMER_SECRET,
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

export default handler;
