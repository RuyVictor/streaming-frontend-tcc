import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { useStream } from "../../hooks/stream.hook";
import Button from "../Button";
import Input from "../Input";
import { Container, HorizontalContainer, ProfileName, Title } from "./styles";

const Navbar = () => {
  const { setQueryOptions } = useStream();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <HorizontalContainer>
        <Title>Streaming App</Title>
        <Button variant="secondary" onClick={() => navigate('/lives')}>Em alta</Button>
        <Button variant="secondary" onClick={() => navigate('/categories')}>Categorias</Button>
      </HorizontalContainer>
      <Input
        variant="search"
        width={500}
        onSearch={(event) => {
          setQueryOptions((prevState) => ({
            ...prevState,
            title: event.value?.toString() ?? '',
          }))
          navigate('/lives')
        }}
      />
      <HorizontalContainer>
        { isAuthenticated ?
        <>
          <ProfileName>{user?.name}</ProfileName>
          <Button variant="secondary" onClick={() => navigate('/create-live')}>Criar live</Button>
        </> :
        <>
          <Button variant="secondary" onClick={() => navigate('/signin')}>Fazer Login</Button>
          <Button variant="secondary" onClick={() => navigate('/signup')}>Cadastre-se</Button>
        </>
        }
      </HorizontalContainer>
    </Container>
  );
};

export default Navbar;
