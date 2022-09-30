import { InformationCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import GoogleMapsCoordsModal from "../GoogleMapsCoordsModal";
import { useFormikContext, Field } from "formik";

const LocationForm = () => {
  const [gettingLocation, setGettingLocation] = useState(false);
  const [googleMapsModalOpen, setGoogleMapsModalOpen] = useState(false);
  const { setFieldValue } = useFormikContext();
  const detectLocation = async (e) => {
    e.preventDefault();
    setGettingLocation(true);
    if (!navigator.geolocation) {
      setGettingLocation(false);
      alert("geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setFieldValue("unlockInfo.lat", latitude);
          setFieldValue("unlockInfo.long", longitude);
          setGettingLocation(false);
        },
        (error) => {
          setGettingLocation(false);
          alert(error);
        }
      );
    }
  };

  return (
    <div>
      <button
        onClick={detectLocation}
        className="mb-2 text-pinata-purple bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {gettingLocation ? "Detecting location..." : "Detect Location"}
      </button>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="unlockInfo.lat"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Latitude* </span>
          <span className="cursor" aria-label="button" onClick={() => setGoogleMapsModalOpen(true)}>
            <InformationCircleIcon className="h-6 w-6 -mt-2 ml-2 text-black" aria-hidden="true" />
          </span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Field
              type="text"
              name="unlockInfo.lat"
              required
              id="unlockInfo.lat"
              autoComplete="off"
              placeholder="Latitude"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="unlockInfo.long"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Longitude* </span>
          <span className="cursor" aria-label="button" onClick={() => setGoogleMapsModalOpen(true)}>
            <InformationCircleIcon className="h-6 w-6 -mt-2 ml-2 text-black" aria-hidden="true" />
          </span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Field
              type="text"
              name="unlockInfo.long"
              required
              id="unlockInfo.long"
              autoComplete="off"
              placeholder="Longitude"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="unlockInfo.distance"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Allowed Range (in miles)*</span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Field
              type="number"
              name="unlockInfo.distance"
              required
              id="unlockInfo.distance"
              autoComplete="off"
              placeholder="Distance"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <GoogleMapsCoordsModal
        googleMapsModalOpen={googleMapsModalOpen}
        setGoogleMapsModalOpen={setGoogleMapsModalOpen}
      />
    </div>
  );
};

export default LocationForm;
