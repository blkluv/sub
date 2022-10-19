import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import { useState } from "react";
import Gallery from "./Gallery";
import VideoWrapper from "./MediaWrappers/VideoWrapper";
import Image from "next/image";
import SingleMediaDisplay from "./SingleMediaDisplay";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;
  
    return(
      <div>
      {submarinedContent.directory ? 
        <Gallery name={name} content={submarinedContent} />
        :
        <SingleMediaDisplay url={url} submarinedContent={submarinedContent}/>
      }
      </div>
    )
};

export default UnlockedContentContainer;
