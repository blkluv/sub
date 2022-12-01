import { useAppSelector } from "../../store/hooks";
import { selectSubmarinedContent } from "../../store/selectors/submarinedContentSelectors";
import Gallery from "./Gallery";
import SingleMediaDisplay from "./SingleMediaDisplay";
import { Unstable_Grid2 } from "@mui/material";

const UnlockedContentContainer = ({ name }) => {
  const submarinedContent = useAppSelector(selectSubmarinedContent);
  const url = `${submarinedContent.gateway}/ipfs/${submarinedContent.cid}?accessToken=${submarinedContent.token}`;

  return (
    <Unstable_Grid2 container>
      {submarinedContent.directory ? (
        <Gallery name={name} content={submarinedContent} />
      ) : (
        <Unstable_Grid2
          sx={{
            position: "relative",
            height: "70vh",
            width: "70vw",
          }}
        >
          <SingleMediaDisplay name={name} url={url} submarinedContent={submarinedContent} />
        </Unstable_Grid2>
      )}
    </Unstable_Grid2>
  );
};

export default UnlockedContentContainer;
