import { withIronSession } from "next-iron-session";

function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "web3-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { oauth_token, oauth_verifier } = req.body;

      const tokens = req.session.get("tokens");

      const oauth_token_secret = tokens[oauth_token].oauth_token_secret;

      const { oauth_access_token, oauth_access_token_secret } = await oauth.getOAuthAccessToken(
        oauth_token,
        oauth_token_secret,
        oauth_verifier
      );

      tokens[oauth_token] = {
        ...tokens[oauth_token],
        oauth_access_token,
        oauth_access_token_secret,
      };

      //  Get logged in user info;
      const response = await oauth.getProtectedResource(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        "GET",
        oauth_access_token,
        oauth_access_token_secret
      );

      const { screen_name } = JSON.parse(response.data);

      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY,
        appSecret: process.env.CONSUMER_SECRET,
        accessToken: oauth_access_token,
        accessSecret: oauth_access_token_secret,
      });

      const v2Client = client.v2;
      const rt = await v2Client.tweetRetweetedBy("1458471151416578052");
      const retweets = rt.data;
      const retweeted = retweets.find((r) => r.username === screen_name);
      if (!retweeted) {
        return res.status(401).send("Unauthorized, you didn't retweet.");
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Missing access token" });
    }
  }
});
