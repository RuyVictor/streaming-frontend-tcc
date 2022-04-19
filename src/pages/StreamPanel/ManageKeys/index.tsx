import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  HorizontalContainer,
  InputsContainer,
} from "./styles";
import { StreamService } from "../../../services";
import { toast } from "react-toastify";
import { Alert, Button, Input, LoadingIndicator } from "../../../components";

const ManageKeys: FC = () => {
  const navigate = useNavigate();

  const [transmissionKey, setTransmissionKey] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputTransmissionKeyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const streamResponse = await StreamService.getTransmissionKey();
        setTransmissionKey(streamResponse.data.transmission_key);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocorreu um problema ao requisitar dados do servidor!");
      }
    }
    fetchData();
  }, []);

  function copyTransmissionKey() {
    inputTransmissionKeyRef.current?.select();
    navigator.clipboard.writeText(transmissionKey ?? '');
    toast.success("Chave copiada com sucesso!");
  }

  return (
    <Container>
      {!isLoading ? (
        <InputsContainer>
          <Alert>
            Lembre-se de que a chave de transmissão não pode ser compartilhada
            com ninguém, então vise guardar em um local seguro.
          </Alert>
          <HorizontalContainer>
            <Input
              label="Chave de transmissão"
              value={transmissionKey}
              readOnly
              ref={inputTransmissionKeyRef}
            />
            <Button
              variant="secondary"
              disabled={!transmissionKey}
              onClick={copyTransmissionKey}
              style={{ height: 45 }}
            >
              Copiar
            </Button>
          </HorizontalContainer>
        </InputsContainer>
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
};

export default ManageKeys;
