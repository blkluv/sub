import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";
import SingleMediaDisplay from "./SingleMediaDisplay";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  return (
    <div>
      {submarinedContent.directory ? (
        <Gallery name={name} content={submarinedContent} />
      ) : (
        <SingleMediaDisplay url={url} submarinedContent={submarinedContent} />
      )}
    </div>
  );
};

export default UnlockedContentContainer;
