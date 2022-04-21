import { FC } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { IStream } from '../../models/Stream';
import { Category, Container, Description, HorizontalContainer, ImageCard, InfoContainer, Title, UserName, VerticalContainer } from './styles';

interface IProps {
    stream: IStream;
};

const StreamCard: FC<IProps> = ({
    stream,
    children,
    ...rest
}) => {
    const navigate = useNavigate();
    
    return (
        <Container key={stream.id} onClick={() => navigate(`/lives/${stream.user.name}`)}>
          <ImageCard
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4bf14109185029.5fce5f81c4b8f.jpg"
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
                <BsPeopleFill size={20}/>
                {stream.spectators}
            </HorizontalContainer>
          </InfoContainer>
        </Container>
    );
};

export default StreamCard;