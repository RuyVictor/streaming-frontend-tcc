import { useEffect, useRef } from "react";
import { ReactFlvPlayer } from "react-flv-player";
import ReactHlsPlayer from 'react-hls-player';

// Styles
import {
  WrapperContainer,
  Container,
  StreamInfoContainer,
  VerticalContainer,
  StreamTitle,
  StreamHost,
  StreamDescription,
} from "./styles";
import { IStream } from "../../models/Stream";

interface IVideoPlayerProps {
  stream?: IStream;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ stream }) => {
  const videoRef = useRef<any>(null);

  /* useEffect(() => {
    async function playVideo() {
      if (stream && videoRef?.current) {
        const video = videoRef?.current?.myRef.current as HTMLVideoElement;
        console.log(videoRef)
        await new Promise((r) => setTimeout(r, 1000));
        video.muted = false;
        try {
          await video.play();
        } catch(err) {
        }
      }
    }

    playVideo()
  }, []); */

  return (
    <Container>
      <WrapperContainer inactive={stream?.status === "inactive"}>
        {stream && stream?.status !== "inactive" ? (
          <ReactHlsPlayer
            src={stream?.url}
            playerRef={videoRef}
            disablePictureInPicture
            autoPlay={true}
            controls={true}
            width="100%"
            height="auto"
          />
        ) : (
          <span>Stream Offline</span>
        )}
      </WrapperContainer>
      <StreamInfoContainer>
        <VerticalContainer>
          <StreamHost>{stream?.user.name}</StreamHost>
        </VerticalContainer>
        <VerticalContainer>
          <StreamTitle>{stream?.title}</StreamTitle>
          <StreamDescription>{stream?.description}</StreamDescription>
        </VerticalContainer>
      </StreamInfoContainer>
    </Container>
  );
};

export default VideoPlayer;
