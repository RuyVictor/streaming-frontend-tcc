import { useEffect, useRef } from "react";
import { ReactFlvPlayer } from "react-flv-player";

// Styles
import {
  WrapperContainer,
  Container,
  StreamInfoContainer,
  VerticalContainer,
  StreamTitle,
  StreamHost,
} from "./styles";
import { IStream } from "../../models/Stream";

interface IVideoPlayerProps {
  stream?: IStream;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ stream }) => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    let loadedVideo: HTMLVideoElement;

    async function playVideo() {
      if (stream && videoRef?.current) {
        const video = videoRef?.current?.myRef.current as HTMLVideoElement;
        loadedVideo = video;
        await new Promise((r) => setTimeout(r, 1000));
        video.muted = false;
        try {
          await video.play();
        } catch(err) {
        }
      }
    }

    playVideo()
  }, [stream]);

  return (
    <Container>
      <WrapperContainer inactive={stream?.status === "inactive"}>
        {stream && stream?.status !== "inactive" ? (
          <ReactFlvPlayer
            ref={videoRef}
            url={stream?.url}
            isMuted={false}
            isLive={true}
            enableStashBuffer={true}
          />
        ) : (
          <span>Stream Offline</span>
        )}
      </WrapperContainer>
      <StreamInfoContainer>
        <VerticalContainer>
          <StreamTitle>{stream?.title}</StreamTitle>
          <StreamHost>{stream?.user.name}</StreamHost>
        </VerticalContainer>
      </StreamInfoContainer>
    </Container>
  );
};

export default VideoPlayer;
