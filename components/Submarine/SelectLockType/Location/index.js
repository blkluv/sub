import React from "react";
import NFTDetail from "../NFTDetail";
import LocationForm from "./LocationForm";

const Location = ({
  onThumbnailChange,
  thumbnail,
  name,
  setName,
  description,
  setDescription,
  onFileChange,
  selectedFiles,
  file,
  setFile,
  lat,
  setLat,
  long,
  setLong,
  distance,
  setDistance,
  logoCid,
  onLogoChange,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  fontFamily,
  setFontFamily,
  uploadingLogo,
  background,
  uploadingBackground,
  onBackgroundChange,
  backgroundCid,
  logo,
  buttonShape, 
  setButtonShape
}) => {
  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">
          {"Allow content to be unlocked by a person's geolocation"}
        </h3>
        <p className="text-gray-600">
          Upload media that can only be unlocked if the person trying to access
          it is within a specified range of a location you define.
        </p>
      </div>
      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <LocationForm
          lat={lat}
          long={long}
          distance={distance}
          setLat={setLat}
          setLong={setLong}
          setDistance={setDistance}
        />
        <NFTDetail
          onThumbnailChange={onThumbnailChange}
          thumbnail={thumbnail}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onFileChange={onFileChange}
          selectedFiles={selectedFiles}
          file={file}
          setFile={setFile}
          uploadingBackground={uploadingBackground}
          backgroundCid={backgroundCid}
          background={background}
          onBackgroundChange={onBackgroundChange}
          logoCid={logoCid}
          onLogoChange={onLogoChange}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          buttonTextColor={buttonTextColor}
          setButtonTextColor={setButtonTextColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          uploadingLogo={uploadingLogo}
          logo={logo}
          buttonShape={buttonShape}
          setButtonShape={setButtonShape}
        />
      </div>
    </div>
  );
};

export default Location;
