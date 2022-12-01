import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";
import SingleMediaDisplay from "./SingleMediaDisplay";
import { Box, Unstable_Grid2 } from "@mui/material";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  return submarinedContent.directory ? (
    <Gallery name={name} content={submarinedContent} />
  ) : (
    <SingleMediaDisplay name={name} url={url} submarinedContent={submarinedContent} />
  );
};

export default UnlockedContentContainer;
