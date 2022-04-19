import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingIndicator, VideoPlayer } from "../../components";
import { Container, ChatContainer } from "./styles";
import { IStream } from "../../models/Stream";
import { StreamService } from "../../services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const Stream = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [stream, setStream] = useState<IStream>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await StreamService.getOneStream(params.streamHost!);
        setStream(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const err = error as AxiosError;
        navigate(-1);
        if (err.response?.status === 404) {
          return toast.error("Stream não encontrada!");
        }
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      {stream && <VideoPlayer stream={stream!} />}
      <ChatContainer></ChatContainer>
    </Container>
  );
};

export default Stream;
