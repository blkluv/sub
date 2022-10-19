import React from 'react'
import ReactPlayer from 'react-player'

const VideoWrapper = ( url) => {
  console.log({url})
  return (
    <ReactPlayer 
      url={url} 
      controls={true}
      playing={true}
      pip={true}
      stopOnUnmount={true}
      className="md:w-3/4 md:h-3/4 w-full h-full"
      width="100%"
      height="100%"
      // onError={() => window.open(url, "_blank", "noopener,noreferrer")}
    />
  )
}

export default VideoWrapper