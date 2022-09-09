import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

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
