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
import { faImage, faMusic, faVideo } from "@fortawesome/free-solid-svg-icons";
import mime from "mime";

interface GalleryProps {
  content: SubmarinedContent;
  name: string;
}
export const iconMapper = (type) => {
  const map = {
    image: faImage,
    audio: faMusic,
    video: faVideo,
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
    "application/gzip": "fa-file-archive-o",
    "application/zip": "fa-file-archive-o",
  };
  return map[type];
};

export const getType = (type) => {
  return mime.getType(type);
};


export default function Gallery({ content, name }: GalleryProps) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const [displayItem, setDisplayItem] = useState(null)
  const mainThree = ["image", "audio", "video"];
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
    setIsDisplaying(true)
    setDisplayItem(item)
  }

  const getIcon = (filename) => {
    const extension = filename.substr(filename.lastIndexOf(".") + 1);
    const type = getType(extension);
    let icon = null;
    if (type && mainThree.includes(type.split("/")[0])) {
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
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-2">
        <h2 className="text-xl font-sans font-bold sm:my-4 my-6">{name}</h2>
          {!isDisplaying ? 
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        
            {items.map((item) => (
              <button 
                  key={item.id}  
                  onClick={() => displaySingleMedia(item)} 
                  className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <FontAwesomeIcon
                    icon={getIcon(getName(item.originalname))}
                    style={{ fontSize: 75, padding: 10 }}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{getName(item.originalname)}</h3>
                {/* <p className="mt-1 text-lg font-medium text-gray-900">{item.cid}</p> */}
              </button>
            ))}
            </div>
            :
            <div>
                <SingleMediaDisplay url={`${content.gateway}${displayItem.uri}?accessToken=${content.token}`} submarinedContent={displayItem} />
                <button onClick={() => setIsDisplaying(false)}>Back</button>
            </div>
            }

      </div>
      {content.totalItems > items.length && (
        <div>
          <Pagination handlePageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
