import React from "react";
import Location from "../../components/Submarine/SelectLockType/Location";
import SubmarineFileForm from "../../components/Submarine/SelectLockType/SubmarineFileForm";
import { ContentWithUnlockInfo } from "../../helpers/verify.helpers";

const LocationLock = () => {
  const canSubmit = (values) => {
    return true;
    // return values.lat && values.long && values.distance;
  };
  const initialValues: Omit<ContentWithUnlockInfo, "id" | "pinata_user_id"> = {
    unlock_info: {
      type: "location",
      lat: 0,
      long: 0,
      distance: "0",
    },
    description: "",
    customizations: {},
    name: "",
    short_id: "",
    submarine_cid: "",
    thumbnail: "",
    selectedFiles: [],
  };

  return (
    <SubmarineFileForm canSubmit={canSubmit} initialValues={initialValues}>
      <Location />
    </SubmarineFileForm>
  );
};

export default LocationLock;
