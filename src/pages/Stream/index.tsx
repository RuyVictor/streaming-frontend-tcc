import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStream } from "../../hooks/search.hook";
import {
  Container,
  CardTitle,
  VideoContainer,
  HorizontalContainer,
  ChatContainer,
} from "./styles";

const Stream = () => {
  const navigate = useNavigate();
  const { handleGetStreams, streams } = useStream();

  useEffect(() => {
    handleGetStreams({
      search_filter: "",
      page: 1,
    });
  }, []);

  return (
    <Container>
      <VideoContainer>

      </VideoContainer>
      <ChatContainer>
        
      </ChatContainer>
    </Container>
  );
};

export default Stream;
