import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { getKy } from "../../../helpers/ky";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
// import { Stream } from "@cloudflare/stream-react";

export interface EmbeddedPlayerProps {
  fileInfo: MetadataUnlockInfo;
  submarinedContent: SubmarinedContent;
  url: string;
}

const EmbeddedPlayer = ({ fileInfo, submarinedContent, url }: EmbeddedPlayerProps) => {
  // const [streamLink, setStreamLink] = useState<any>();
  // const ky = getKy();

  // useEffect(() => {
  //   submarinedContent &&
  //     ky
  //       .post(`/api/content/streamLink/${submarinedContent.itemId}`, {
  //         json: {
  //           shortId: fileInfo.shortId,
  //           itemId: submarinedContent.itemId,
  //         },
  //       })
  //       .json()
  //       .then((res) => {
  //         console.log(res["streamURL"]);
  //         setStreamLink(res["streamURL"]);
  //       });
  // }, []);

  return (
    <>
      {/* {streamLink && ( */}
      <ReactPlayer
        url={url}
        controls={true}
        playing={true}
        pip={true}
        muted={true}
        stopOnUnmount={true}
        width="100%"
        height="100%"
        onError={() => console.log("Cannot play this Media")}
      />
      {/* <div>
        <Stream controls src={streamLink} />
         </div>
      )} */}
    </>
  );
};

export default EmbeddedPlayer;
