import ReactPlayer from "react-player";

export interface EmbeddedPlayerProps {
  url: string;
  fileType: string;
}

const EmbeddedPlayer = ({ url, fileType }: EmbeddedPlayerProps) => {
  if (ReactPlayer.canPlay(url)) {
    return (
      <ReactPlayer
        url={url}
        controls={true}
        playing={true}
        pip={true}
        muted={true}
        stopOnUnmount={true}
        sx={{
          width: "100%",
          height: "100%",
          md: {
            height: "75%",
            width: "75%",
          },
        }}
        width="100%"
        height="100%"
        onError={() => console.log("Cannot play this Media")}
      />
    );
  } else {
    return <h1>Oops! It seems that media cannot be played at the moment.</h1>;
  }
};

export default EmbeddedPlayer;
