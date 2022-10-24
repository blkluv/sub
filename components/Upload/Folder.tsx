import { Button } from "@mui/material";
import { useRef } from "react";

const Folder = ({ onChange }) => {
  const fileInput = useRef(null);

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        ref={fileInput}
        onChange={onChange}
        // @ts-ignore */ https://github.com/facebook/react/issues/3468
        // eslint-disable-next-line
        directory=""
        // eslint-disable-next-line
        webkitdirectory=""
        onClick={() => fileInput.current.click()}
      />
      <label
        htmlFor="raised-button-file"
        style={{
          cursor: "pointer",
        }}
      >
        <span>Select a folder</span>
      </label>
    </>
  );
};

export default Folder;
