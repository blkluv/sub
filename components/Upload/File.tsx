import { Button } from "@mui/material";
import React, { useRef } from "react";

import shortUUID from "short-uuid";
const File = ({ onChange }) => {
  const fileInput = useRef(null);

  const id = shortUUID.generate();
  return (
    <>
      <input
        style={{ display: "none" }}
        id={id}
        name={id}
        multiple
        type="file"
        ref={fileInput}
        onChange={onChange}
      />
      <label
        htmlFor={id}
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
