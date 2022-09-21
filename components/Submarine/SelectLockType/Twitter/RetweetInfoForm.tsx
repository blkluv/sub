import React from "react";

export default function RetweetInfoForm({ setTweetURL, tweetURL }) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
      <label
        htmlFor="tweet"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
      >
        <span>Tweet URL*</span>
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex">
          <input
            value={tweetURL}
            onChange={(e) => setTweetURL(e.target.value)}
            type="url"
            name="tweet"
            required
            id="tweet"
            autoComplete="off"
            placeholder="Tweet URL"
            className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}
