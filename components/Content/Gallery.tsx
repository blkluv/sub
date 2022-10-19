import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { iconMapper, getType, getIcon, getName } from "../../helpers/gallery.helpers";
import Pagination from "../Dashboard/Pagination";
config.autoAddCss = false;
import { SubmarinedContent } from "../../types/SubmarinedContent";
import { useAppDispatch } from "../../store/hooks";
import { setSubmarinedContent } from "../../store/slices/submarinedContentSlice";
import { getKy } from "../../helpers/ky";
import SingleMediaDisplay from "./SingleMediaDisplay";

interface GalleryProps {
  content: SubmarinedContent;
  name: string;
}

export default function Gallery({ content, name }: GalleryProps) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const [displayItem, setDisplayItem] = useState(null)
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
