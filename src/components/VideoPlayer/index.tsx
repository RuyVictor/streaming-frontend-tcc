import * as React from "react";
import videojs from "video.js";

// Styles
import "videojs-flvjs-es6";
import "videojs-fetch-flv";
// import 'videojs-fetch-flv/dist/videojs-fetch-flv.css'
import "video.js/dist/video-js.css";
import { Container, Video } from "./styles";

interface IVideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src }) => {
  const initialOptions: videojs.PlayerOptions = {
    controls: true,
    controlBar: {
      volumePanel: {
        inline: false,
      },
    },
    sources: [
      {
        src: src,
        type: "video/flv",
      },
    ],
    autoplay: true,
    plugins: {
      fetchFlv: {
        isLive: true,
        cors: true,
      },
    },
  };
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player>();

  React.useEffect(() => {
    if (src) {
      player.current = videojs(videoNode.current as any, initialOptions).ready(
        function () {
          this.play();
        }
      );
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, [src]);

  return (
    <Container><Video ref={videoNode} className="video-js" /></Container>
  );
};

export default VideoPlayer;
