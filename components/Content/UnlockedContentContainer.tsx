import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";
import SingleMediaDisplay from "./SingleMediaDisplay";

const UnlockedContentContainer = ({ fileInfo }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  if (!submarinedContent) {
    throw new Error("Missing Submarined Content");
  }
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  return submarinedContent.directory && !submarinedContent.html ? (
    <Gallery fileInfo={fileInfo} content={submarinedContent} />
  ) : submarinedContent.directory && submarinedContent.html ? (
    window.location.replace(
      `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}/index.html?accessToken=${submarinedContent.token}`
    )
  ) : (
    <SingleMediaDisplay url={url} submarinedContent={submarinedContent} />
  );
};

export default UnlockedContentContainer;
