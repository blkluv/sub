
import { withIronSession } from "next-iron-session";
import { getOauthSecret, getUserContentCombo } from "../../../../helpers/verify.helpers";
import { getSubmarinedContent } from "../../../../helpers/submarine";

const { TwitterApi } = require('twitter-api-v2');

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
  if(req.method === "POST") {
    try {
      const oauth = require('../../../../helpers/oauth-promise')(process.env.CONSUMER_CALLBACK);
      const {oauth_token, oauth_token_secret} = await oauth.getOAuthRequestToken();
      const obj = {
        oauth_token, 
        oauth_secret: oauth_token_secret
      }
      const { data, error } = await supabase
      .from('Twitter')
      .insert([
        obj,
      ]);
      //req.session.set("tokens", tokens);    
      res.json({ oauth_token });  
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }    
  } else {
    try {
      const { oauth_token, oauth_verifier, shortId } = req.query;
      const oauth = require('../../../../helpers/oauth-promise')(process.env.CONSUMER_CALLBACK);
      const token = await getOauthSecret(oauth_token);
  
      const oauth_token_secret = token.oauth_secret;
      
      const {oauth_access_token, oauth_access_token_secret} = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
      
      //  Get logged in user info;
      const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", oauth_access_token, oauth_access_token_secret);
  
      const { screen_name } = JSON.parse(response.data);

      const info = await getUserContentCombo(shortId);
      const { unlock_info, submarine_cid } = info;      
      const { pinata_submarine_key, pinata_gateway_subdomain } = info.Users;

      const { tweetUrl } = unlock_info;
  
      const client = new TwitterApi({
        appKey: process.env.CONSUMER_KEY,
        appSecret: process.env.CONSUMER_SECRET,
        accessToken: oauth_access_token,
        accessSecret: oauth_access_token_secret,
      });
  
      const v2Client = client.v2;

      const rt = await v2Client.tweetRetweetedBy(tweetUrl.split("status/")[1].split("?")[0]);    
      const retweets = rt.data;
      const retweeted = retweets.find(r => r.username === screen_name);

      if(!retweeted) {
        return res.status(401).send("Unauthorized, you didn't retweet.")
      } 

      const responseObj = await getSubmarinedContent(pinata_submarine_key, submarine_cid, pinata_gateway_subdomain);
      return res.json(
        responseObj
      );
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }    
  }
});