import React from 'react'
import ReactPlayer from 'react-player'

export interface EmbeddedPlayerProps  {
  url: string, 
  fileType: string,
}

const EmbeddedPlayer = ( {url, fileType} : EmbeddedPlayerProps) => {

  if(ReactPlayer.canPlay(url)){
    return (
      <div>
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
    )
  }
  else {
    return(
      <h1>Oops! It seems that media cannot be played at the moment.</h1>
    )
  }
}

export default EmbeddedPlayer