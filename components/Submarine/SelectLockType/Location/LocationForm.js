import React, { useState } from "react";

const LocationForm = ({
  lat,
  setLat,
  long,
  setLong,
  distance,
  setDistance,
}) => {
  const [gettingLocation, setGettingLocation] = useState(false);
  const detectLocation = async () => {
    setGettingLocation(true);
    if(!navigator.geolocation) {
      setGettingLocation(false);
      alert("geolocation not supported");      
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude);
        setLong(longitude);     
        setGettingLocation(false);   
      }, (error) => {
        setGettingLocation(false);
        alert(error);
      });
    }
  }

  return (
    <div>
      <button onClick={detectLocation} className="mb-2 text-pinata-purple bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{gettingLocation ? "Detecting location..." : "Detect Location"}</button>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="lat"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Latitude*</span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              type="text"
              name="lat"
              required
              id="lat"
              autoComplete="off"
              placeholder="Latitude"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="long"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Longitude*</span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <input
              value={long}
              onChange={(e) => setLong(e.target.value)}
              type="text"
              name="long"
              required
              id="long"
              autoComplete="off"
              placeholder="Longitude"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
        <label
          htmlFor="distance"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
        >
          <span>Allowed Range (in miles)*</span>
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <input
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              type="number"
              name="distance"
              required
              id="distance"
              autoComplete="off"
              placeholder="Distance"
              className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
