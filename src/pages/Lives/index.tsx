import { useEffect } from "react";
import { useStream } from "../../hooks/stream.hook";
import {
  Container,
} from "./styles";
import StreamCard from "../../components/StreamCard";
import { Nothing } from "../../components";

const Home = () => {
  const { handleGetStreams, streams, queryOptions, isLoading } = useStream();

  useEffect(() => {
    handleGetStreams({
      query: queryOptions.query ?? '',
      page: queryOptions.page,
      take: queryOptions.take
    });

  }, [queryOptions]);

  return (
    <Container>
      {streams?.map((stream) => <StreamCard key={stream.id} stream={stream}/>)}
      {(streams?.length === 0 && !isLoading) && <Nothing>Há um grande vazio por aqui...</Nothing>}
    </Container>
  );
};

export default Home;
