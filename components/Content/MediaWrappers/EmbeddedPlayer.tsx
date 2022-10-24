import ReactPlayer from "react-player";

export interface EmbeddedPlayerProps {
  url: string;
}

const EmbeddedPlayer = ({ url }: EmbeddedPlayerProps) => {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "10%" }}>
      <ReactPlayer
        url={url}
        controls={true}
        playing={true}
        pip={true}
        muted={true}
        stopOnUnmount={true}
        className="md:w-3/4 md:h-3/4 w-full h-full"
        width="100%"
        height="100%"
        onError={() => console.log("Cannot play this Media")}
      />
    </div>
  );
};

export default EmbeddedPlayer;
