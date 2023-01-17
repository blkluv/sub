import ReactPlayer from "react-player";

export interface EmbeddedPlayerProps {
  url: string;
}

const EmbeddedPlayer = ({ url }: EmbeddedPlayerProps) => {
  const streamingUrl = `${url}&streaming=true&mode=hls`;
  return (
    <>
      <ReactPlayer
        url={streamingUrl}
        controls={true}
        playing={true}
        pip={true}
        muted={true}
        stopOnUnmount={true}
        width="100%"
        height="100%"
        onError={() => console.log("Cannot play this Media")}
      />
    </>
  );
};

export default EmbeddedPlayer;
