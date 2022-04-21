import { useEffect } from "react";
import { useStream } from "../../hooks/stream.hook";
import {
  Container, GridContainer,
} from "./styles";
import StreamCard from "../../components/StreamCard";
import { Nothing } from "../../components";

const Home = () => {
  const { handleGetStreams, streams, setStreams, queryOptions, isLoading } = useStream();

  useEffect(() => {
    handleGetStreams({
      query: queryOptions.query ?? '',
      page: queryOptions.page,
      take: queryOptions.take
    });

    return () => {
      setStreams({})
    }

  }, [queryOptions]);

  

  return (
    <Container>
      <GridContainer>
        {streams?.data?.map((stream) => <StreamCard key={stream.id} stream={stream}/>)}
      </GridContainer>
      {(streams?.data?.length === 0 && !isLoading) && <Nothing>Há um grande vazio por aqui...</Nothing>}
    </Container>
  );
};

export default Home;
