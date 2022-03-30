import mime from "mime";
import {
  faImage,
  faMusic,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

export const iconMapper = (type) => {
  const map = {
    "image": faImage,
    "audio": faMusic,
    "video": faVideo,
    "application/pdf": "fa-file-pdf-o",
    "application/msword": "fa-file-word-o",
    "application/vnd.ms-word": "fa-file-word-o",
    "application/vnd.oasis.opendocument.text": "fa-file-word-o",
    "application/vnd.openxmlformats-officedocument.wordprocessingml":
      "fa-file-word-o",
    "application/vnd.ms-excel": "fa-file-excel-o",
    "application/vnd.openxmlformats-officedocument.spreadsheetml":
      "fa-file-excel-o",
    "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
    "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
    "application/vnd.openxmlformats-officedocument.presentationml":
      "fa-file-powerpoint-o",
    "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
    "text/plain": "fa-file-text-o",
    "text/html": "fa-file-code-o",
    "application/json": "fa-file-code-o",
    "application/gzip": "fa-file-archive-o",
    "application/zip": "fa-file-archive-o",
  };
  return map[type];
};

export const getType = (type) => {
  return mime.getType(type);
};
