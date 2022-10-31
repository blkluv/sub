import { InformationCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import GoogleMapsCoordsModal from "../GoogleMapsCoordsModal";
import { useFormikContext, Field } from "formik";
import InformationCircleIconStyled from "../../../Form/InformationCircleIconStyled";
import FormikTextfield from "../../../Form/FormikTextfield";
import { Button, Unstable_Grid2 } from "@mui/material";
import { TextField } from "formik-mui";

const LocationForm = () => {
  const [gettingLocation, setGettingLocation] = useState(false);
  const [googleMapsModalOpen, setGoogleMapsModalOpen] = useState(false);
  const { setFieldValue } = useFormikContext();
  const detectLocation = async (e) => {
    e.preventDefault();
    setGettingLocation(true);
    if (!navigator.geolocation) {
      setGettingLocation(false);
      alert("geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setFieldValue("unlockInfo.lat", latitude);
          setFieldValue("unlockInfo.long", longitude);
          setGettingLocation(false);
        },
        (error) => {
          setGettingLocation(false);
          alert(error);
        }
      );
    }
  };

  return (
    <Unstable_Grid2 container spacing={2}>
      <Button onClick={detectLocation}>
        {gettingLocation ? "Detecting location..." : "Detect Location"}
      </Button>

      <Unstable_Grid2>
        <Field
          sx={{ m: 1 }}
          component={TextField}
          name="unlockInfo.lat"
          label="Latitude"
          required
          adornment={
            <span aria-label="button" onClick={() => setGoogleMapsModalOpen(true)}>
              <InformationCircleIconStyled />
            </span>
          }
        />
        <Field
          sx={{ m: 1 }}
          component={TextField}
          name="unlockInfo.long"
          label="Longitude"
          required
          adornment={
            <span aria-label="button" onClick={() => setGoogleMapsModalOpen(true)}>
              <InformationCircleIconStyled />
            </span>
          }
        />
        <Field sx={{ m: 1 }} name="unlockInfo.distance" label="Distance" component={TextField} />
        <GoogleMapsCoordsModal
          googleMapsModalOpen={googleMapsModalOpen}
          setGoogleMapsModalOpen={setGoogleMapsModalOpen}
        />
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default LocationForm;
