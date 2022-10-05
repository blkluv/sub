import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  if (submarinedContent.directory) {
    return <Gallery name={name} content={submarinedContent} />;
  }
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;
  window.open(url, "_blank", "noopener,noreferrer");
  return (
    <div>
      <button onClick={() => window.open(url)}>Content unlocked!</button>
    </div>
  );
};

export default UnlockedContentContainer;
