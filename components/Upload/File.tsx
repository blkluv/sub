import React, { useRef } from "react";

const File = ({ onChange }) => {
  const fileInput = useRef(null);

  return (
    <div>
      <span>Select a file</span>
      <input
        id="file-upload-main"
        name="file-upload-main"
        type="file"
        className="sr-only"
        ref={fileInput}
        onChange={onChange}
      />
    </div>
  );
};

export default File;
