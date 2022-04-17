import { useEffect } from "react";
import { useStream } from "../../hooks/stream.hook";
import { BsPeopleFill } from "react-icons/bs";
import {
  Container,
} from "./styles";
import StreamCard from "../../components/StreamCard";

const Home = () => {
  const { handleGetStreams, streams, queryOptions } = useStream();

  useEffect(() => {
    handleGetStreams({
      title: queryOptions.title,
      page: queryOptions.page,
      take: queryOptions.take
    });
  }, [queryOptions]);

  return (
    <Container>
      {streams?.map((stream) => <StreamCard key={stream.id} stream={stream}/>)}
    </Container>
  );
};

export default Home;
