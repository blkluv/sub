import Image from "next/image";

export default function Twitter({ meta }) {
  const authWithTwitter = async (callbackUrl) => {
    try {
      //OAuth Step 1
      const response = await axios({
        url: `/api/twitter?request_token=true`,
        method: "POST",
        data: {
          callbackUrl,
        },
      });

      const { oauth_token } = response.data;
      localStorage.setItem("ot", oauth_token);
      //Oauth Step 2
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="text-center mt-10">
              <Image alt="Twitter logo" width={150} height={84} src="/Twitter-Logo.png" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              This Submarined Content Requires You To Retweet a Tweet
            </h2>
            <p className="mt-4 text-center">
              <a
                className="underline"
                href={meta?.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the Tweet while signed into your Twitter account
              </a>
              . Retweet the tweet, then return here and authenticate with your Twitter account.
            </p>
          </div>

          <div>
            <button
              type="submit"
              onClick={authWithTwitter}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {"I've retweeted the tweet"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
