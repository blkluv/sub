import React from "react";
import Location from "../../components/Submarine/SelectLockType/Location";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfoLocation } from "../../types/UnlockInfo";

const LocationLock = () => {
  const canSubmit = (values) => {
    return values.unlockInfo.lat && values.unlockInfo.long && values.unlockInfo.distance;
  };
  const unlockInfo: UnlockInfoLocation = {
    type: "location",
    lat: null,
    long: null,
    distance: null,
  };

  return (
    <SubmarineFileForm canSubmit={canSubmit} unlockInfo={unlockInfo}>
      <Location />
    </SubmarineFileForm>
  );
};

export default LocationLock;
