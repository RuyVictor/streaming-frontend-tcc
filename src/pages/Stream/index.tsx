import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chat, LoadingIndicator, VideoPlayer } from "../../components";
import { Container, HorizontalContainer } from "./styles";
import { IStream } from "../../models/Stream";
import { StreamService } from "../../services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const Stream = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [stream, setStream] = useState<IStream>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await StreamService.getOneStream({
          hostname: params.streamHost!,
        });
        setStream(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate("/404");
        const err = error as AxiosError;
        if (err.response?.status === 404 || err.response?.status === 500) {
          return toast.error("Stream não encontrada!");
        }
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      {!isLoading ? (
        <HorizontalContainer>
          <VideoPlayer stream={stream} />
          <Chat stream={stream} />
        </HorizontalContainer>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default Stream;
