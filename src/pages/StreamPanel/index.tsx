import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingIndicator, VideoPlayer } from "../../components";
import {
  Container,
  VideoContainer,
  MenuContainer,
  StreamInfoContainer,
  VerticalContainer,
  StreamTitle,
  StreamHost,
  MenuItem,
} from "./styles";
import { IStream } from "../../models/Stream";
import { StreamService } from "../../services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth.hook";
import EditStreamInfo from "./EditStreamInfo";

const StreamPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [stream, setStream] = useState<IStream>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const items = [
    "Painel",
    "Informações da transmissão",
    "Chave de transmissão",
  ];
  const defaultOption = items[0];

  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("option") ?? defaultOption
  );

  useEffect(() => {
    const tagParam = searchParams.get("option");
    tagParam
      ? setSelectedOption(tagParam)
      : navigate(`?option=${defaultOption}`); // categoria padrão
  }, [location.search]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await StreamService.getOneStream(user?.name!);
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
      <MenuContainer>
        {items.map((item) => (
          <MenuItem
            selected={selectedOption === item}
            onClick={() => navigate(`?option=${item}`)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuContainer>
      {selectedOption === items[0] ? (
        <VideoContainer>
          {stream && <VideoPlayer stream={stream!} />}
          <StreamInfoContainer>
            <VerticalContainer>
              <StreamTitle>{stream?.title}</StreamTitle>
              <StreamHost>{stream?.user.name}</StreamHost>
            </VerticalContainer>
          </StreamInfoContainer>
        </VideoContainer>
      ) : selectedOption === items[1] ? (
        <EditStreamInfo />
      ) : null}
    </Container>
  );
};

export default StreamPanel;
