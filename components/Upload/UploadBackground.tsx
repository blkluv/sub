import React, { useRef } from "react";
import { Field } from "formik";

const UploadBackground = () => {
  const fileInput = useRef(null);
  return (
    <button
      type="button"
      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className="flex text-sm text-gray-600">
        <label
          htmlFor="file-upload-background"
          className="relative cursor-pointer bg-white rounded-md font-medium text-pinata-purple hover:text-pinata-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Select a background</span>
          <Field
            id="file-upload-background"
            name="file-upload-background"
            type="file"
            className="sr-only"
            accept=".png, .jpeg, .jpg, .gif"
            ref={fileInput}
          />
        </label>
      </div>
    </button>
  );
};

export default UploadBackground;
