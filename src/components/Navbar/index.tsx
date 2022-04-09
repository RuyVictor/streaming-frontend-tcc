import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { useStream } from "../../hooks/search.hook";
import Button from "../Button";
import Input from "../Input";
import { Container, HorizontalContainer, Title } from "./styles";

const Navbar = () => {
  const { setQueryOptions } = useStream();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <HorizontalContainer>
        <Title>Streaming App</Title>
        <Button variant="secondary" onClick={() => navigate('/home')}>Página Inicial</Button>
      </HorizontalContainer>
      <Input
        variant="search"
        width={500}
        onSearch={(event) => {
          navigate('/home')
          setQueryOptions((prevState) => ({
            ...prevState,
            search_filter: event.value?.toString() ?? '',
          }))
          console.log(event.value)
        }}
      />
      <HorizontalContainer>
        { isAuthenticated && <Button variant="secondary" onClick={() => navigate('/create-live')}>Criar live</Button> }
        { !isAuthenticated && <Button variant="secondary" onClick={() => navigate('/signin')}>Fazer Login</Button> }
        { !isAuthenticated && <Button variant="secondary" onClick={() => navigate('/signup')}>Cadastre-se</Button> }
      </HorizontalContainer>
    </Container>
  );
};

export default Navbar;
