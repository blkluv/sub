import { useState } from "react";
import GoogleMapsCoordsDialog from "../GoogleMapsCoordsDialog";
import { useFormikContext } from "formik";
import InformationCircleIconStyled from "../../../Form/InformationCircleIconStyled";
import FormikTextfield from "../../../Form/FormikTextfield";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import AddressAutocomplete from "./AddressAutocomplete";
import { MetadataUnlockInfo } from "../SubmarineFileForm";

enum LocationType {
  Address = "address",
  LatLong = "latlong",
}

const LocationForm = () => {
  const [gettingLocation, setGettingLocation] = useState(false);
  const [googleMapsDialogOpen, setGoogleMapsDialogOpen] = useState(false);
  const { setFieldValue, values } = useFormikContext<MetadataUnlockInfo>();
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setLocationType(event.target.value as LocationType);
  };

  const [locationType, setLocationType] = useState(
    values?.unlockInfo?.type === "location" && values?.unlockInfo?.lat
      ? LocationType.LatLong
      : LocationType.Address
  );
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em", marginTop: "2em" }}>
      <Unstable_Grid2
        container
        sx={{ gap: "1em", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h5">Location Details</Typography>
        <Button variant="outlined" onClick={detectLocation}>
          {gettingLocation ? "Detecting location..." : "Detect Location"}
        </Button>
      </Unstable_Grid2>
      <RadioGroup row value={locationType} onChange={handleRadioChange}>
        <FormControlLabel value={LocationType.Address} control={<Radio />} label="Address" />
        <FormControlLabel
          value={LocationType.LatLong}
          control={<Radio />}
          label="Latitude / Longitude"
        />
      </RadioGroup>
      {locationType === LocationType.Address ? (
        <AddressAutocomplete />
      ) : (
        <>
          <FormikTextfield
            name="unlockInfo.lat"
            label="Latitude"
            required
            adornment={
              <span aria-label="button" onClick={() => setGoogleMapsDialogOpen(true)}>
                <InformationCircleIconStyled />
              </span>
            }
          />
          <FormikTextfield
            name="unlockInfo.long"
            label="Longitude"
            required
            adornment={
              <span aria-label="button" onClick={() => setGoogleMapsDialogOpen(true)}>
                <InformationCircleIconStyled />
              </span>
            }
          />
        </>
      )}
      <FormikTextfield name="unlockInfo.distance" label="Allowed Range (in miles)" required />
      <GoogleMapsCoordsDialog
        googleMapsDialogOpen={googleMapsDialogOpen}
        setGoogleMapsDialogOpen={setGoogleMapsDialogOpen}
      />
    </Unstable_Grid2>
  );
};

export default LocationForm;
