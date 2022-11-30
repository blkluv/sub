import React from "react";
import LockTypeContainer from "../LockTypeContainer";
import LocationForm from "./LocationForm";

const Location = () => {
  const description = "Allow content to be unlocked by a person's geolocation.";
  const title = "Location";
  return (
    <LockTypeContainer title={title} description={description}>
      <LocationForm />
    </LockTypeContainer>
  );
};

export default Location;
