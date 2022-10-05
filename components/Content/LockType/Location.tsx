import { MapIcon } from "@heroicons/react/outline";
import React from "react";
import { getKy } from "../../../helpers/ky";
import { useAppDispatch } from "../../../store/hooks";
import { setAlert } from "../../../store/slices/alertSlice";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { UnlockInfoLocation } from "../../../types/UnlockInfo";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import BaseLockType from "./LockTypeContainer";

interface LocationProps {
  fileInfo: MetadataUnlockInfo;
}
const LocationUnlock = ({ fileInfo }: LocationProps) => {
  const dispatch = useAppDispatch();
  const unlockInfo: UnlockInfoLocation =
    fileInfo.unlockInfo.type === "location" && fileInfo.unlockInfo;
  const verifyLocation = async (): Promise<SubmarinedContent | void> => {
    if (!navigator.geolocation) {
      dispatch(setAlert({ type: "error", message: "Your device does not support geolocation" }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          const ky = getKy();
          const res = await ky.post("/api/location/verify", {
            body: JSON.stringify({
              userLat: latitude,
              userLong: longitude,
              shortId: window.location.pathname.split("/")[1],
            }),
          });
          const data: SubmarinedContent = await res.json();
          return data;
        } catch (error) {
          dispatch(setAlert({ type: "error", message: error.response.statusText }));
        }
      },
      (error) => {
        dispatch(
          setAlert({
            type: "error",
            message: "Location services may be disabled on your device, please enable them.",
          })
        );
      }
    );
  };
  const description = (
    <>
      <p className="text-muted text-sm">
        You have to be within <strong>{unlockInfo?.distance}</strong> mile(s) of these coordinates
        to unlock this media:
      </p>
      <p className="mt-4">
        <a
          className="flex flex-row space-around justify-center underline text-pinata-purple"
          href={`https://www.openstreetmap.org/#map=18/${fileInfo?.unlockInfo?.lat}/${fileInfo?.unlockInfo?.long}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>
            {unlockInfo?.lat}, {unlockInfo?.long}
          </span>
          <span>
            <MapIcon className="h-5 ml-2" />
          </span>
        </a>
      </p>
    </>
  );
  return (
    <BaseLockType
      description={description}
      fileInfo={fileInfo}
      lockName={"location"}
      handleVerify={verifyLocation}
    />
  );
};

export default LocationUnlock;
