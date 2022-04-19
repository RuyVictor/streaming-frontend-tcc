import * as React from "react";
import videojs from "video.js";

// Styles
import "videojs-flvjs-es6";
import "videojs-fetch-flv";
// import 'videojs-fetch-flv/dist/videojs-fetch-flv.css'
import "video.js/dist/video-js.css";
import { Container, Video } from "./styles";
import { IStream } from "../../models/Stream";

interface IVideoPlayerProps {
  stream: IStream;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ stream }) => {
  const initialOptions: videojs.PlayerOptions = {
    controls: true,
    controlBar: {
      volumePanel: {
        inline: false,
      },
    },
    sources: [
      {
        src: stream.url,
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
    if (stream.status !== "inactive") {
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
  }, [stream]);

  return (
    <Container inactive={stream.status === "inactive"}>
      {stream.status !== "inactive" ? <Video ref={videoNode} className="video-js" /> : <span>Stream Offline</span>}
    </Container>
  );
};

export default VideoPlayer;
