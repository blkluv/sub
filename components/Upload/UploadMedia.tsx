import React, { useState } from "react";
import File from "./File";
import Folder from "./Folder";
import { useFormikContext } from "formik";
import { getKy } from "../../helpers/ky";
import { ContentResponseTO } from "../../types/managed/api";
import shortUUID from "short-uuid";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { useAppDispatch } from "../../store/hooks";
import { setAlert } from "../../store/slices/alertSlice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Typography,
  RadioGroup,
  Unstable_Grid2,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";

enum FileType {
  File = "file",
  Folder = "folder",
}

const UploadMedia = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null[]>([]);
  const [dragOverActive, setDragOverActive] = useState(false);

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    setDragOverActive(true);
  };

  const [uploadType, setUploadFile] = useState(FileType.File);

  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFile(event.target.value as FileType);
  };
  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }
  const dispatch = useAppDispatch();
  const onFileChange = async (e: HTMLInputEvent, type) => {
    const FILE_SIZE_LIMIT = 500000000; // 500MB
    const files = e.target.files;
    setSelectedFiles(files);
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > FILE_SIZE_LIMIT) {
        dispatch(
          setAlert({
            type: "error",
            message: "File too large, limit is 500mb",
          })
        );
        return;
      }
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
      });
    }
    const data = new FormData();
    const identifier = values.shortId || shortUUID.generate();

    data.append("name", identifier);
    Array.from(files).forEach((file) => {
      data.append("files", file);
    });
    data.append("pinToIPFS", "false");

    const ky = getKy();
    const res = await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/content`, {
      method: "POST",
      body: data,
      timeout: false,
    });

    const resJson: ContentResponseTO = await res.json();
    setFieldValue("submarineCID", resJson.items[0].cid);
    setFieldValue("shortId", identifier);
  };

  const dragExitHandler = (ev) => {
    ev.preventDefault();
    setDragOverActive(false);
  };

  const dropHandler = (ev) => {
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
    <Unstable_Grid2 container spacing={0}>
      <Unstable_Grid2>
        <>
          <FormLabel> Are you Submarining a single file or a folder?</FormLabel>
          <RadioGroup row value={uploadType} onChange={handleChange}>
            <FormControlLabel value={FileType.Folder} control={<Radio />} label="Folder" />
            <FormControlLabel value={FileType.File} control={<Radio />} label="File" />
          </RadioGroup>
        </>
        <Unstable_Grid2
          container
          spacing={0}
          justifyContent="center"
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
          onDragLeave={dragExitHandler}
          sx={{
            borderWidth: 2,
            borderColor: dragOverActive ? "primary.main" : "grey.400",
            borderStyle: "dashed",
            borderRadius: 1,
          }}
        >
          <Unstable_Grid2>
            <Container>
              <svg
                style={{
                  width: "3rem",
                  height: "3rem",
                  margin: "auto",
                  color: "gray",
                }}
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
            </Container>
            <Unstable_Grid2 container>
              <Typography
                component={"label"}
                sx={{
                  color: "primary.main",
                }}
                htmlFor="file-upload-main"
              >
                {uploadType === FileType.File ? (
                  <File onChange={onFileChange} />
                ) : (
                  <Folder onChange={onFileChange} />
                )}
              </Typography>
              <Typography
                sx={{
                  paddingLeft: "0.25rem",
                  display: {
                    sm: "block",
                    xs: "none",
                  },
                }}
              >
                or drag and drop
              </Typography>
            </Unstable_Grid2>
            {selectedFiles.length > 0 ? (
              <Typography variant={"body2"}>
                {uploadType === FileType.File
                  ? selectedFiles[0].name
                  : selectedFiles[0].webkitRelativePath.split("/")[0]}{" "}
                ({selectedFiles.length} files in folder)
              </Typography>
            ) : (
              <Typography variant={"body2"}>Any file up to 500MB</Typography>
            )}
          </Unstable_Grid2>
        </Unstable_Grid2>
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};

export default UploadMedia;
