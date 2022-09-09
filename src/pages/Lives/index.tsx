import { useEffect, useState } from "react";
import { useStream } from "../../hooks/stream.hook";
import { Container, GridContainer } from "./styles";
import StreamCard from "../../components/StreamCard";
import { LoadingIndicator, Nothing } from "../../components";
import { toast } from "react-toastify";
import { StreamService } from "../../services";
import { IPagination } from "../../models/Common/Pagination";
import { IStream, IStreamSearch } from "../../models/Stream";

const Home = () => {
  const { searchQuery } = useStream();

  const [isLoading, setIsLoading] = useState(false);
  const [streams, setStreams] = useState<IPagination<IStream[]>>({
    data: [],
    total: 0,
  });
  const [queryOptions, setQueryOptions] = useState<IStreamSearch>({
    page: 1,
    take: 9,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await StreamService.getStreams({
          query: searchQuery,
          page: queryOptions.page,
          take: queryOptions.take,
        });
        setStreams(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    }
    fetchData();
  }, [searchQuery]);

  return (
    <Container>
      {!isLoading ? (
        <>
          <GridContainer>
            {streams?.data?.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </GridContainer>
          {streams?.data?.length === 0 && (
            <Nothing>Há um grande vazio por aqui...</Nothing>
          )}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default Home;
