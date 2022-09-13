import React from "react";
import UploadFile from "../../Upload/UploadFile";

const Retweet = ({ onFileChange, selectedFiles, tweetUrl, setTweetUrl }) => {
  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">
          Allow content to be unlocked with a retweet
        </h3>
        <p className="text-gray-600">
          {`All you have to do is choose the tweet that you'd like retweeted,
          provide the URL to the tweet, and anyone trying to access your file
          will not be able to access it unless they have retweeted the tweet in
          question.`}
        </p>
      </div>

      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Tweet URL
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
              <input
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                type="text"
                name="tweet"
                id="tweet"
                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
        </div>

        <UploadFile onFileChange={onFileChange} selectedFiles={selectedFiles} />
      </div>
    </div>
  );
};

export default Retweet;
