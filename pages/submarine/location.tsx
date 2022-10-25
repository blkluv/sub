import React from "react";
import Location from "../../components/Submarine/SelectLockType/Location";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfoLocation } from "../../types/UnlockInfo";
import * as Yup from "yup";

const LocationLock = () => {
  const unlockInfo: UnlockInfoLocation = {
    type: "location",
    lat: null,
    long: null,
    distance: null,
  };

  const unlockInfoSchema = Yup.object().shape({
    lat: Yup.number()
      .required("Required")
      .typeError("Value not valid.")
      .min(-90, "Latitude must be between -90 and 90.")
      .max(90, "Latitude must be between -90 and 90."),
    long: Yup.number()
      .required("Required")
      .typeError("Value not valid.")
      .min(-180, "Longitude must be between -180 and 180.")
      .max(180, "Longitude must be between -180 and 180."),
    distance: Yup.number()
      .required("Required")
      .typeError("Value not valid.")
      .min(1, "Distance must be greater than 0."),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Location />
    </SubmarineFileForm>
  );
};

export default LocationLock;
