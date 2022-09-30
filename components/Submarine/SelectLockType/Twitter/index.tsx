import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import TwitterForm from "./TwitterForm";

const Twitter = () => {
  const description =
    "Upload media that can only be unlocked if the person trying to access it retweets a tweet you specify.";
  const title = "Allow content to be unlocked by a Retweet";
  return (
    <LockTypeContainer title={title} description={description}>
      <TwitterForm />
    </LockTypeContainer>
  );
};

export default Twitter;
