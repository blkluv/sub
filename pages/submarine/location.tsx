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
    lat: 0,
    long: 0,
    distance: "0",
  };

  return (
    <SubmarineFileForm canSubmit={canSubmit} unlockInfo={unlockInfo}>
      <Location />
    </SubmarineFileForm>
  );
};

export default LocationLock;
