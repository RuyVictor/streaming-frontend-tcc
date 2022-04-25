import { FC, useRef } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IStream } from "../../models/Stream";
import {
  Category,
  Container,
  HorizontalContainer,
  ImageCard,
  InfoContainer,
  Title,
  UserName,
  VerticalContainer,
} from "./styles";

interface IProps {
  stream: IStream;
}

const StreamCard: FC<IProps> = ({ stream, children, ...rest }) => {
  const navigate = useNavigate();
  const videoRef = useRef<any>(null);

  return (
    <Container
      key={stream.id}
      onClick={() => navigate(`/lives/${stream.user.name}`)}
    >
      <ImageCard
        src={stream?.url}
        disablePictureInPicture
        playerRef={videoRef}
        width="100%"
        height="auto"
      />
      <InfoContainer>
        <VerticalContainer>
          <Title>{stream.title}</Title>
          <HorizontalContainer>
            <UserName>{stream.user.name}</UserName>
            <Category>{stream.category?.name}</Category>
          </HorizontalContainer>
        </VerticalContainer>
        <HorizontalContainer>
          <BsPeopleFill size={20} />
          {stream.spectators}
        </HorizontalContainer>
      </InfoContainer>
    </Container>
  );
};

export default StreamCard;
