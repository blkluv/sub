import React, { useRef, useState } from "react";
import File from "./File";
import Folder from "./Folder";

const UploadMedia = ({ selectedFiles, onFileChange, file, setFile }) => {
  const [dragOverActive, setDragOverActive] = useState(false);

  const dragOverHandler = (ev) => {
    console.log("File(s) in drop zone");
    ev.preventDefault();
    setDragOverActive(true);
  };

  const dragExitHandler = (ev) => {
    ev.preventDefault();
    setDragOverActive(false);
  };

  const dropHandler = (ev) => {
    console.log("File(s) dropped");
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      if (ev.dataTransfer.items.length > 1) {
        alert("Only one file allowed at a time");
        return;
      }
      const files = [];

      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          files.push(file);
          console.log("... file[" + i + "].name = " + file.name);
        }
      }
      ev.target.files = files;
      onFileChange(ev, "submarine");
    } else {
      if (ev.dataTransfer.files.length > 1) {
        alert("Only one file allowed at a time");
        return;
      }
      ev.target.files = ev.dataTransfer.files;
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log("... file[" + i + "].name = " + ev.dataTransfer.files[i].name);
      }
      onFileChange(ev, "submarine");
    }
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mt-2">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Media to Submarine
      </label>
      <div className="mt-1 mb-2 sm:mt-0 sm:col-span-2">
        <div>
          <p className="text-sm leading-5 text-gray-500">
            Are you Submarining a single file or a folder?
          </p>
          <fieldset className="mt-4 mb-4">
            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
              <div className="flex items-center">
                <input
                  id="file"
                  name="notification-method"
                  type="radio"
                  checked={file}
                  onChange={() => setFile(true)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="file" className="ml-3 block text-sm font-medium text-gray-700">
                  Upload File
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="folder"
                  name="notification-method"
                  type="radio"
                  checked={!file}
                  onChange={() => setFile(false)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="folder" className="ml-3 block text-sm font-medium text-gray-700">
                  Upload Folder
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
          onDragLeave={dragExitHandler}
          className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 rounded-md ${
            dragOverActive ? "border-blue border-solid bg-blue" : "border-gray-300 border-dashed"
          }`}
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload-main"
                className="relative cursor-pointer bg-white rounded-md font-medium text-pinata-purple hover:text-pinata-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pinata-purple"
              >
                {file ? <File onChange={onFileChange} /> : <Folder onChange={onFileChange} />}
              </label>
              <p className="hidden sm:block pl-1">or drag and drop</p>
            </div>
            {selectedFiles.length > 0 ? (
              <p className="text-xs text-gray-500">
                {file ? selectedFiles[0].name : selectedFiles[0].webkitRelativePath.split("/")[0]} (
                {selectedFiles.length} files in folder)
              </p>
            ) : (
              <p className="text-xs text-gray-500">Any file up to 500MB</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMedia;
