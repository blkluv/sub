import MapIcon from "@mui/icons-material/Map";
import { Divider, Typography, Unstable_Grid2 } from "@mui/material";
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
      <Divider sx={{ width: "100%", margin: (theme) => theme.spacing(2, 0, 2, 0) }} />
      <Typography
        variant="h6"
        sx={{
          padding: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        You have to be within <strong>{unlockInfo?.distance}</strong> mile(s) of these coordinates
        to unlock this media:
      </Typography>
      <Typography
        paragraph
        sx={{
          color: (theme) => theme.palette.primary.main,
          textDecoration: "underline",
        }}
      >
        <a
          href={`https://www.openstreetmap.org/#map=18/${unlockInfo?.lat}/${unlockInfo?.long}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Unstable_Grid2 container sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{
                padding: (theme) => theme.spacing(1),
                color: (theme) => theme.palette.primary.contrastText,
              }}
            >
              {unlockInfo?.lat}, <br /> {unlockInfo?.long}
            </Typography>
            <MapIcon
              style={{ marginLeft: "0.5rem" }}
              height={"1.5rem"}
              sx={{ color: (theme) => theme.palette.primary.contrastText }}
            />
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
