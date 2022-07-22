import React from "react";
import NFTDetail from "../NFTDetail";
import RetweetInfoForm from "./RetweetInfoForm";

const Twitter = ({
  onThumbnailChange,
  thumbnail,
  name,
  setName,
  description,
  setDescription,
  onFileChange,
  selectedFiles,
  file,
  setFile,
  tweetUrl,
  setTweetUrl,
  logoCid,
  onLogoChange,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  fontFamily,
  setFontFamily,
  uploadingLogo,
  background,
  uploadingBackground,
  onBackgroundChange,
  backgroundCid,
  logo,
  buttonShape, 
  setButtonShape
}) => {
  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">
          Allow content to be unlocked by a Retweet
        </h3>
        <p className="text-gray-600">
          Upload media that can only be unlocked if the person trying to access
          it retweets a tweet you specify.
        </p>
      </div>
      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <RetweetInfoForm tweetURL={tweetUrl} setTweetURL={setTweetUrl} />
        <NFTDetail
          onThumbnailChange={onThumbnailChange}
          thumbnail={thumbnail}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onFileChange={onFileChange}
          selectedFiles={selectedFiles}
          file={file}
          setFile={setFile}
          uploadingBackground={uploadingBackground}
          backgroundCid={backgroundCid}
          background={background}
          onBackgroundChange={onBackgroundChange}
          logoCid={logoCid}
          onLogoChange={onLogoChange}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          buttonTextColor={buttonTextColor}
          setButtonTextColor={setButtonTextColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          uploadingLogo={uploadingLogo}
          logo={logo}
          buttonShape={buttonShape}
          setButtonShape={setButtonShape}
        />
      </div>
    </div>
  );
};

export default Twitter;
