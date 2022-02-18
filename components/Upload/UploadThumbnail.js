import React, { useRef } from "react";

const UploadThumbnail = ({ onThumbnailChange }) => {
  const fileInput = useRef(null);
  return (
    <div className="flex text-sm text-gray-600">
      <label
        htmlFor="file-upload"
        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <span>Select a thumbnail image</span>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept=".png, .jpeg, .jpg, .gif"
          ref={fileInput}
          onChange={onThumbnailChange}
        />
      </label>
    </div>
  );
};

export default UploadThumbnail;
