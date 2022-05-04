import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LoadingIndicator, VideoPlayer } from "../../components";
import {
  Container,
  MenuContainer,
  MenuItem,
  FixedWidthContainer,
} from "./styles";
import { IStream } from "../../models/Stream";
import { StreamService } from "../../services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth.hook";
import EditStreamInfo from "./EditStreamInfo";
import ManageKeys from "./ManageKeys";

const StreamPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [stream, setStream] = useState<IStream>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const items = [
    {label: "Painel", index: 0},
    {label: "Informações da transmissão", index: 1},
    {label: "Gerenciar chaves", index: 2},
  ];
  const defaultOption = items[0].label;

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
      {!isLoading ? (
        <>
          <MenuContainer>
            {items.map((item) => (
              <MenuItem
                key={item.index}
                selected={selectedOption === item.label}
                onClick={() => navigate(`?option=${item.label}`)}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuContainer>
          <FixedWidthContainer>
            {selectedOption === items[0].label ? (
              <VideoPlayer stream={stream} />
            ) : selectedOption === items[1].label ? (
              <EditStreamInfo />
            ) : selectedOption === items[2].label ? (
              <ManageKeys />
            ) : null}
          </FixedWidthContainer>
        </>
      ) : <LoadingIndicator/>}
    </Container>
  );
};

export default StreamPanel;
