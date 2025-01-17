import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import TwitterForm from "./TwitterForm";

const Twitter = () => {
  const description = "Allow content to be unlocked by a retweet.";
  const title = "Retweet";
  return (
    <LockTypeContainer title={title} description={description}>
      <TwitterForm />
    </LockTypeContainer>
  );
};

export default Twitter;
