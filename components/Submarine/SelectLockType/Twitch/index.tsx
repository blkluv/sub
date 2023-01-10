import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import TwitchForm from "./TwitchForm";

const Twitch = () => {
  const description = "Allow content to be unlocked if a user is subscribed to a twitch channel.";
  const title = "Twitch";
  return (
    <LockTypeContainer title={title} description={description}>
      <TwitchForm />
    </LockTypeContainer>
  );
};

export default Twitch;
