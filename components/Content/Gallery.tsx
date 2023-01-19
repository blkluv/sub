import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Pagination from "../Dashboard/Pagination";
config.autoAddCss = false;
import { SubmarinedContent } from "../../types/SubmarinedContent";
import { useAppDispatch } from "../../store/hooks";
import { setSubmarinedContent } from "../../store/slices/submarinedContentSlice";
import { getKy } from "../../helpers/ky";
import SingleMediaDisplay from "./SingleMediaDisplay";
import {
  faImage,
  faMusic,
  faVideo,
  faFileZipper,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import mime from "mime";
import { IconButton, Paper, Typography, Unstable_Grid2, Button, Box } from "@mui/material";

interface GalleryProps {
  content: SubmarinedContent;
  name: string;
}
export const iconMapper = (type): string => {
  const map = {
    image: faImage,
    audio: faMusic,
    video: faVideo,
    zip: faFileZipper,
    "application/pdf": "fa-file-pdf-o",
    "application/msword": "fa-file-word-o",
    "application/vnd.ms-word": "fa-file-word-o",
    "application/vnd.oasis.opendocument.text": "fa-file-word-o",
    "application/vnd.openxmlformats-officedocument.wordprocessingml": "fa-file-word-o",
    "application/vnd.ms-excel": "fa-file-excel-o",
    "application/vnd.openxmlformats-officedocument.spreadsheetml": "fa-file-excel-o",
    "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
    "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
    "application/vnd.openxmlformats-officedocument.presentationml": "fa-file-powerpoint-o",
    "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
    "text/plain": "fa-file-text-o",
    "text/html": "fa-file-code-o",
    "application/json": "fa-file-code-o",
    "application/gzip": faFileDownload,
    "application/zip": faFileDownload,
  };
  return map[type] || "fa-file-o";
};

export const getType = (type) => {
  return mime.getType(type);
};

export default function Gallery({ content, name }: GalleryProps) {
  const [items, setItems] = useState<any[]>(content.childContent);
  const [offset, setOffset] = useState(0);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false);
  const [displayItem, setDisplayItem] = useState(content.childContent[0]);
  const mainThree = ["image", "audio", "video", "zip"];
  const limit = 10;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (content && content.childContent) {
      setItems(content.childContent);
    }
  }, [content]);

  const handlePageChange = async (dir) => {
    let newOffset;
    if (dir === "forward") {
      newOffset = offset + limit;
      setOffset(newOffset);
    } else {
      newOffset = offset - limit;
      if (newOffset < 0) {
        setOffset(0);
        newOffset = 0;
      } else {
        setOffset(newOffset);
      }
    }

    const ky = getKy();
    const res: SubmarinedContent = await ky
      .post(`/api/content`, {
        json: {
          accessToken: content.token,
          gatewayURL: `${content.gateway}${content.childContent[0].uri}`,
          offset: newOffset,
          shortId: window.location.pathname.split("/")[1],
        },
      })
      .json();

    if (res.childContent.length === 0) {
      setOffset(newOffset - limit);
    } else {
      dispatch(setSubmarinedContent(res));
    }
  };

  const displaySingleMedia = (item) => {
    setIsDisplaying(true);
    setDisplayItem(item);
  };

  const getIcon = (filename): string => {
    if (!filename) {
      return "";
    }
    const extension = filename.substr(filename.lastIndexOf(".") + 1);
    const type = getType(extension);
    let icon = "";
    if (type && mainThree.includes(type.split("/")?.[0])) {
      icon = iconMapper(type.split("/")[0]);
    } else {
      icon = iconMapper(type);
    }
    return icon;
  };
  const getName = (name) => {
    const items = name.split("/");
    return items[items.length - 1];
  };

  return (
    <Paper sx={{ p: (theme) => theme.spacing(5), borderRadius: "20px", borderColor: "green" }}>
      <Unstable_Grid2 container>
        {!isDisplaying ? (
          <Unstable_Grid2
            container
            sx={{
              width: "100%",
              margin: "auto",
            }}
            justifyContent={"center"}
          >
            <Typography variant={"h2"} fontWeight={"bold"}>
              {name}
            </Typography>
            <Unstable_Grid2
              container
              sx={{
                width: "100%",
                margin: "auto",
                marginTop: "1rem",
              }}
              justifyContent={"center"}
            >
              {items.map((item) => (
                <Unstable_Grid2 xs={4} key={item.id}>
                  <Unstable_Grid2
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    alignContent={"center"}
                  >
                    <Box
                      sx={{ textAlign: "center" }}
                      key={item.id}
                      onClick={() => displaySingleMedia(item)}
                    >
                      <Unstable_Grid2 container justifyContent={"center"}>
                        <IconButton>
                          <FontAwesomeIcon
                            // @ts-ignore
                            icon={getIcon(getName(item.originalname))}
                            style={{ fontSize: 60 }}
                          />
                        </IconButton>
                      </Unstable_Grid2>
                      <Typography variant={"body2"}>{getName(item.originalname)}</Typography>
                    </Box>
                  </Unstable_Grid2>
                </Unstable_Grid2>
              ))}
            </Unstable_Grid2>
          </Unstable_Grid2>
        ) : (
          <Unstable_Grid2
            container
            flexDirection={"column"}
            alignItems={"center"}
            gap={"2rem"}
            position={"relative"}
          >
            <Unstable_Grid2
              container
              sx={{
                position: "relative",
                height: "60vh",
                width: "60vw",
                justifyContent: "center",
              }}
            >
              <SingleMediaDisplay
                name={name}
                url={`${content.gateway}${displayItem.uri}?accessToken=${content.token}`}
                submarinedContent={displayItem}
              />
            </Unstable_Grid2>
            <Button sx={{ bottom: "-10%" }} onClick={() => setIsDisplaying(false)}>
              Back
            </Button>
          </Unstable_Grid2>
        )}
      </Unstable_Grid2>
      {content.totalItems > items.length && (
        <Box>
          <Pagination handlePageChange={handlePageChange} />
        </Box>
      )}
    </Paper>
  );
}
