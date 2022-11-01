import { Button } from "@mui/material";
import React, { useRef } from "react";

const File = ({ onChange }) => {
  const fileInput = useRef(null);

  return (
    <>
      <input
        style={{ display: "none" }}
        id="file-upload-main"
        name="file-upload-main"
        multiple
        type="file"
        ref={fileInput}
        onChange={onChange}
      />
      <label
        htmlFor="file-upload-main"
        style={{
          cursor: "pointer",
        }}
      >
        <span>browse your files.</span>
      </label>
    </>
  );
};

export default File;
