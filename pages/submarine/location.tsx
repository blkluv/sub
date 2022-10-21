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

  //TODO - error UI styling
  const unlockInfoSchema = Yup.object().shape({
    lat: Yup.number().required("Distance is required").typeError("Value not valid."),
    long: Yup.number().required("Distance is required").typeError("Value not valid."),
    distance: Yup.number()
      .required("Distance is required")
      .typeError("Value not valid.")
      .min(0, "Distance must be greater than 0"),
  });

  return (
    <SubmarineFileForm unlockInfo={unlockInfo} unlockInfoSchema={unlockInfoSchema}>
      <Location />
    </SubmarineFileForm>
  );
};

export default LocationLock;
