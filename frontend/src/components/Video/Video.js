import React from 'react';
import VideoMain from '../../assets/video.webm'

import './Video.css'

import { Player, ControlBar, PlayToggle} from 'video-react';


export default function Video() {
  return (
    <>
    <Player 
      autoPlay={true}
      playsInline={false}
      src={VideoMain}
      height={300}
      muted={true}
    >
       <ControlBar autoHide={false} disableDefaultControls={true} className="my-class">
       <PlayToggle />
      </ControlBar>
    </Player>
    
    </>
  );
}
