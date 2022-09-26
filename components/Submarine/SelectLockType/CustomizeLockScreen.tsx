import React, { useState, useEffect } from "react";
import UploadBackground from "../../Upload/UploadBackground";
import UploadLogo from "../../Upload/UploadLogo";
import { SketchPicker } from "react-color";
import Image from "next/image";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { useAppSelector } from "../../../store/hooks";
import { useFormikContext } from "formik";
import { ContentWithUnlockInfo } from "../../../helpers/verify.helpers";
import { Field } from "formik";
const CustomizeLockScreen = () => {
  const { values } = useFormikContext<ContentWithUnlockInfo>();
  const background = "QmQgKmX4A7VwZabU6dZgQZBz5wxsuPYMCDggkWiboE2iqp"; // TODO !! values.customizations?.background;
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Background Image
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex items-center">
            <span className="flex align-center justify-center h-40 w-40 overflow-hidden">
              {background && background.length > 0 ? (
                <Image
                  className="w-40"
                  src={
                    typeof background === "string"
                      ? `${gatewayUrl}/ipfs/${background}`
                      : background[0]?.preview
                  }
                  height={160}
                  width={160}
                  alt="preview for thumbnail"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-40 w-40"
                  fill="none"
                  viewBox="0 0 40 40"
                  stroke="gray"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </span>
            {/* {uploadingBackground ? <div>Uploading...</div> : <UploadBackground />} TODO */}
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo Image
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex items-center">
            <span className="h-20 w-20 overflow-hidden flex flex-col align-center justify-center">
              {logoCid && logoCid.length > 0 ? (
                <Image
                  className="w-10"
                  src={`${gatewayUrl}/ipfs/${logoCid}`}
                  alt="preview for logo"
                  height={40}
                  width={40}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </span>
            {uploadingLogo ? <div>Uploading...</div> : <UploadLogo onLogoChange={onLogoChange} />}
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="button-color" className="block text-sm font-medium text-gray-700">
          Button Color
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex items-center">
            {/* <SketchPicker color={buttonColor} onChangeComplete={setButtonColor} /> TODO */}
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="button-text-color" className="block text-sm font-medium text-gray-700">
          Button Text Color
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex items-center">
            {/* <SketchPicker  color={buttonTextColor} onChangeComplete={setButtonTextColor} /> TODO */}
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="button-shape" className="block text-sm font-medium text-gray-700">
          Button Shape
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="button-rounded"
                  name="push-notifications"
                  type="radio"
                  checked={buttonShape === "rounded"}
                  onChange={() => setButtonShape("rounded")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="button-rounded"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Rounded
                </label>
              </div>
              <div className="flex items-center">
                <Field
                  id="button-square"
                  name="push-notifications"
                  type="radio"
                  // checked={buttonShape !== "rounded"} // TODO!
                  // onChange={() => setButtonShape("square")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="button-square"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Square
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:py-5">
        <label htmlFor="font-family" className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <div className="mt-1 sm:mt-0 ">
          <div className="max-w-lg flex">
            <div className="mt-1 sm:mt-0 ">
              <Field
                as="select"
                id="font-family"
                name="font-family"
                autoComplete="country-name"
                className="max-w-lg block w-full sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                <option value="Inter">Inter</option>
                <option value="Lato">Lato</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Roboto">Roboto</option>
                <option value="Roboto Condensed">Roboto Condensed</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
              </Field>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeLockScreen;
