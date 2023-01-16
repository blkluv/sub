import MapIcon from "@mui/icons-material/Map";
import { Divider, Typography, Unstable_Grid2 } from "@mui/material";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { UnlockInfoLocation } from "../../../types/UnlockInfo";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import BaseLockType from "./LockTypeContainer";

interface LocationProps {
  fileInfo: MetadataUnlockInfo;
}
const LocationUnlock = ({ fileInfo }: LocationProps) => {
  if (fileInfo.unlockInfo.type !== "location") {
    return null;
  }
  const unlockInfo: UnlockInfoLocation = fileInfo.unlockInfo;

  const verifyLocation = async (): Promise<SubmarinedContent> => {
    return new Promise<SubmarinedContent>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Your device does not support geolocation");
      }
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
            reject("Could not verify location");
          }
        },
        // error callback
        () => reject("Location services may be disabled on your device, please enable them.")
      );
    });
  };
  const description = (
    <>
      <Typography
        variant="h6"
        sx={{
          padding: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        You have to be within <strong>{unlockInfo?.distance}</strong> mile(s) of{" "}
        {unlockInfo.place ? "this location" : "these coordinates"} to unlock content:
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
              <>
                {unlockInfo?.place?.description || unlockInfo?.lat}, <br />
                {!unlockInfo?.place?.description && unlockInfo?.long}
              </>
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
