import React, { useState, useEffect } from "react";
import UploadMedia from "../../Upload/UploadMedia";
import UploadThumbnail from "../../Upload/UploadThumbnail";
import { Switch } from "@headlessui/react";
import CustomizeLockScreen from "./CustomizeLockScreen";
import { useSubmarine } from "../../../hooks/useSubmarine";
import Image from "next/image";

const NFTDetail = ({
  onThumbnailChange,
  uploadingBackground,
  backgroundCid,
  background,
  onBackgroundChange,
  thumbnail,
  name,
  setName,
  description,
  setDescription,
  onFileChange,
  selectedFiles,
  file,
  setFile,
  logoCid,
  onLogoChange,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  fontFamily,
  setFontFamily,
  uploadingLogo,
  buttonShape,
  setButtonShape,
  logo,
}) => {
  const [customize, setCustomize] = useState(false);
  const { gatewayUrl } = useSubmarine();
  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Thumbnail (Optional)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex items-center">
            <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              {thumbnail && thumbnail.length > 0 ? (
                <Image
                  className="h-12 w-12"
                  src={
                    thumbnail[0].preview ? thumbnail[0].preview : `${gatewayUrl}/ipfs/${thumbnail}`
                  }
                  alt="preview for thumbnail"
                />
              ) : (
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </span>
            <UploadThumbnail onThumbnailChange={onThumbnailChange} />
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5 mt-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Name*
        </label>
        <div className="mt-2 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              maxLength={100}
              autoComplete="off"
              required
              id="name"
              placeholder="Give your unlockable content a name"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
          <div>
            <p className="text-sm text-pinata-purple">{`${name.length}/100`}</p>
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5 mt-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Description*
        </label>
        <div className="mt-2 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="description"
              id="description"
              autoComplete="off"
              required
              maxLength={400}
              placeholder="Describe the content"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
          <div>
            <p className="text-sm text-pinata-purple">{`${
              description ? description.length : 0
            }/400`}</p>
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5 mt-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Customize Unlock Screen
        </label>
        <div className="mt-2 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Switch
              checked={customize}
              onChange={setCustomize}
              className={
                customize
                  ? "bg-pinata-purple relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={
                  customize
                    ? "translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    : "translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                }
              />
            </Switch>
          </div>
        </div>
      </div>
      {customize && (
        <CustomizeLockScreen
          uploadingBackground={uploadingBackground}
          background={background}
          onBackgroundChange={onBackgroundChange}
          logoCid={logoCid}
          logo={logo}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          setButtonColor={setButtonColor}
          setButtonTextColor={setButtonTextColor}
          uploadingLogo={uploadingLogo}
          onLogoChange={onLogoChange}
          backgroundCid={backgroundCid}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          buttonShape={buttonShape}
          setButtonShape={setButtonShape}
        />
      )}
      <UploadMedia
        onFileChange={onFileChange}
        selectedFiles={selectedFiles}
        file={file}
        setFile={setFile}
      />
    </div>
  );
};

export default NFTDetail;
