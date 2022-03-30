import React, { useRef } from "react";

const Folder = ({ onChange }) => {
  const fileInput = useRef(null);

  return (
    <div>
      <span onClick={() => fileInput.current.click()}>Select a folder</span>
      <input
        style={{ display: "none" }}
        ref={fileInput}
        onChange={onChange}
        directory=""
        webkitdirectory=""
        type="file"
      />
    </div>
  );
};

export default Folder;
