import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";
import SingleMediaDisplay from "./SingleMediaDisplay";

const UnlockedContentContainer = ({ fileInfo }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  return submarinedContent.directory ? (
    <Gallery fileInfo={fileInfo} content={submarinedContent} />
  ) : (
    <SingleMediaDisplay url={url} submarinedContent={submarinedContent} />
  );
};

export default UnlockedContentContainer;
