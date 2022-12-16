import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { getKy } from "../../../helpers/ky";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
// import { Stream } from "@cloudflare/stream-react";

export interface EmbeddedPlayerProps {
  fileInfo: MetadataUnlockInfo;
  submarinedContent: SubmarinedContent;
}

const EmbeddedPlayer = ({ fileInfo, submarinedContent }: EmbeddedPlayerProps) => {
  const [streamLink, setStreamLink] = useState<any>();
  const ky = getKy();

  useEffect(() => {
    submarinedContent &&
      ky
        .post(`/api/content/streamLink/${submarinedContent.itemId}`, {
          json: {
            shortId: fileInfo.shortId,
            itemId: submarinedContent.itemId,
          },
        })
        .json()
        .then((res) => {
          console.log(res["streamURL"]);
          setStreamLink(res["streamURL"]);
        });
  }, []);

  return (
    <>
      {streamLink && (
        <ReactPlayer
          url={
            "https://customer-wk3d2k0q81qz7onk.cloudflarestream.com/5f26f1facb48d1e531c57d657a949273/manifest/video.m3u8"
          }
          controls={true}
          playing={true}
          pip={true}
          muted={true}
          stopOnUnmount={true}
          width="100%"
          height="100%"
          onError={() => console.log("Cannot play this Media")}
        />
        // <div>
        //   <Stream controls src={streamLink} />
        // </div>
      )}
    </>
  );
};

export default EmbeddedPlayer;
