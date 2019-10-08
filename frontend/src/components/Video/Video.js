import React from 'react';
import VideoMain from '../../assets/video.webm'


import { Player } from 'video-react';


export default function Video() {
  return (
    <>
    <Player
      playsInline
      poster="/assets/poster.png"
      src={VideoMain}
      muted={true}
      width={500}
    />
    </>
  );
}
