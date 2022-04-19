import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingIndicator, VideoPlayer } from "../../components";
import { Container, VideoContainer, ChatContainer, StreamInfoContainer, VerticalContainer, StreamTitle, StreamHost } from "./styles";
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
        setIsLoading(true)
        const response = await StreamService.getOneStream(params.streamHost!);
        setStream(response.data);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
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
      <VideoContainer>
        {stream && <VideoPlayer stream={stream!} />}
        <StreamInfoContainer>
          <VerticalContainer>
            <StreamTitle>{stream?.title}</StreamTitle>
            <StreamHost>{stream?.user.name}</StreamHost>
          </VerticalContainer>
        </StreamInfoContainer>
      </VideoContainer>
      <ChatContainer></ChatContainer>
    </Container>
  );
};

export default Stream;
