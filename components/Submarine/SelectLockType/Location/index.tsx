import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import LocationForm from "./LocationForm";

const Location = () => {
  const description =
    "Upload media that can only be unlocked if the person trying to access it is within a specified range of a location you define.";
  const title = "Allow content to be unlocked by a person's geolocation";
  return (
    <LockTypeContainer title={title} description={description}>
      <LocationForm />
    </LockTypeContainer>
  );
};

export default Location;
