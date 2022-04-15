import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useStream } from "../../hooks/stream.hook";
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
  const { handleGetStreams, streams, queryOptions } = useStream();

  useEffect(() => {
    handleGetStreams({
      search_filter: queryOptions.search_filter,
      page: queryOptions.page,
      take: queryOptions.take
    });
  }, [queryOptions]);

  return (
    <Container>
      {streams?.map((stream) => (
        <CardContainer>
          <ImageCard
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/a4bf14109185029.5fce5f81c4b8f.jpg"
          onClick={() => navigate(stream.name)}
          
          />
          <CardInfoContainer>
            <HorizontalContainer>
              <CardTitle>{stream.name}</CardTitle>
              <CardDescription>{stream.description}</CardDescription>
            </HorizontalContainer>
            <HorizontalContainer>
              <BsPeopleFill size={20}/>
              {26}
            </HorizontalContainer>
          </CardInfoContainer>
        </CardContainer>
      ))}
    </Container>
  );
};

export default Home;
