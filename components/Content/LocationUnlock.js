import { MapIcon } from "@heroicons/react/outline";
import React from "react";
import CustomButton from "./CustomButton";

const LocationUnlock = ({
  fileInfo,
  verifying,
  verifyLocation,
  isButtonCustom,
}) => {
  return (
    <div>
      <p className="text-muted text-sm">
        You have to be within <strong>{fileInfo?.unlockInfo?.distance}</strong>{" "}
        mile(s) of these coordinates to unlock this media:
      </p>
      <p className="mt-4">
        <a
          className="flex flex-row space-around justify-center underline text-pinata-purple"
          href={`https://www.openstreetmap.org/#map=18/${fileInfo?.unlockInfo?.lat}/${fileInfo?.unlockInfo?.long}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>
            {fileInfo?.unlockInfo?.lat}, {fileInfo?.unlockInfo?.long}
          </span>{" "}
          <span>
            <MapIcon className="h-5 ml-2" />
          </span>
        </a>
      </p>
      {isButtonCustom() ? (
        <CustomButton
          fileInfo={fileInfo}
          onClick={() => verifyLocation()}
          buttonText={"Verify location"}
          loadingText={"Verifying location..."}
          loading={verifying}
        />
      ) : (
        <button
          onClick={() => verifyLocation()}
          className="mt-4 w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
        >
          {verifying ? "Verifying location..." : "Verify location"}
        </button>
      )}
    </div>
  );
};

export default LocationUnlock;
