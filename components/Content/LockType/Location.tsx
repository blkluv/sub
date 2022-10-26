import { MapIcon } from "@heroicons/react/outline";
import { Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";
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
    const promise = new Promise<SubmarinedContent>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const ky = getKy();
            const data: SubmarinedContent = await ky
              .post("/api/location/verify", {
                json: {
                  userLat: latitude,
                  userLong: longitude,
                  shortId: window.location.pathname.split("/")[1],
                },
              })
              .json();
            resolve(data);
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
    });
    return promise;
  };
  const description = (
    <>
      <Typography>
        You have to be within <strong>{unlockInfo?.distance}</strong> mile(s) of these coordinates
        to unlock this media:
      </Typography>
      <Typography
        paragraph
        sx={{
          marginTop: (theme) => theme.spacing(4),
          color: (theme) => theme.palette.primary.main,
          textDecoration: "underline",
        }}
      >
        <a
          href={`https://www.openstreetmap.org/#map=18/${unlockInfo?.lat}/${unlockInfo?.long}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Unstable_Grid2 container justifyContent={"center"}>
            <span>
              {unlockInfo?.lat}, {unlockInfo?.long}
            </span>
            <MapIcon style={{ marginLeft: "0.5rem" }} height={"1.5rem"} />
          </Unstable_Grid2>
        </a>
      </Typography>
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
