import React, { useEffect, useState } from "react";
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
  FormControlLabel,
  Radio,
  Typography,
  RadioGroup,
  Unstable_Grid2,
  CircularProgress,
  Box,
} from "@mui/material";
import { AlertType } from "../Alert";

enum FileType {
  File = "file",
  Folder = "folder",
}

const UploadPrivateMedia = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null[]>([]);
  const [dragOverActive, setDragOverActive] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const dragOverHandler = (ev) => {
    ev.preventDefault();
    setDragOverActive(true);
  };

  const [uploadType, setUploadFile] = useState(FileType.File);

  const { values, setFieldValue } = useFormikContext<MetadataUnlockInfo>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setUploadFile(event.target.value as FileType);
  };
  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }
  const dispatch = useAppDispatch();
  const onFileChange = async (e: HTMLInputEvent, type) => {
    setIsUploading(true);
    const FILE_SIZE_LIMIT = 500000000; // 500MB
    const files = e.target.files;
    if (!files) {
      return;
    }
    setSelectedFiles(files);
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > FILE_SIZE_LIMIT) {
        dispatch(
          setAlert({
            type: AlertType.Error,
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
    setFieldValue("submarineCID", resJson?.items?.[0].cid);
    setFieldValue("shortId", identifier);
    setIsUploading(false);
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
      const files: any[] = [];

      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile()!;
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
    <>
      <Typography variant="h6"> Are you Submarining a single file or a folder?</Typography>
      <RadioGroup row value={uploadType} onChange={handleChange}>
        <FormControlLabel value={FileType.File} control={<Radio />} label="Single File" />
        <FormControlLabel value={FileType.Folder} control={<Radio />} label="Folder" />
      </RadioGroup>
      <Unstable_Grid2
        container
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        onDragLeave={dragExitHandler}
        sx={{
          width: "100%",
          height: "5em",
          // TO DO: add this color to theme
          border: (theme) => `2px dashed #C8C8C8`,
          borderRadius: "8px",
          backgroundColor: (theme) => theme.palette.primary.light,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ display: { sm: "block", nxs: "none", color: "#C8C8C8" } }}>
          Drag or drop a {uploadType === FileType.File ? "file" : "folder"} here or
        </Typography>
        <Typography
          component={"label"}
          sx={{
            paddingLeft: "0.25rem",
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
        {selectedFiles.length > 0 && (
          <Typography variant={"body2"}>
            {uploadType === FileType.File
              ? selectedFiles?.[0]?.name
              : selectedFiles?.[0]?.webkitRelativePath.split("/")[0]}{" "}
            ({selectedFiles.length} files in folder)
          </Typography>
        )}
      </Unstable_Grid2>
    </>
  );
};

export default UploadPrivateMedia;
