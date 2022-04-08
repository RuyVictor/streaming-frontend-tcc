import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useStream } from "../../hooks/search.hook";
import { BsPeopleFill } from "react-icons/bs";
import {
  Container,
  ImageCard,
  CardContainer,
  CardTitle,
  CardInfoContainer,
  CardDescription,
  HorizontalContainer,
} from "./styles";

const Home = () => {
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
      {streams?.map((stream) => (
        <CardContainer>
          <ImageCard src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4bf14109185029.5fce5f81c4b8f.jpg" />
          <CardInfoContainer>
            <HorizontalContainer>
              <CardTitle>{stream.name}</CardTitle>
              <CardDescription>{stream.description}</CardDescription>
            </HorizontalContainer>
            <HorizontalContainer>
              <BsPeopleFill size={25}/>
              {26}
            </HorizontalContainer>
          </CardInfoContainer>
        </CardContainer>
      ))}
    </Container>
  );
};

export default Home;
