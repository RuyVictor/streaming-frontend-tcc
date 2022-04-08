import { useStream } from "../../hooks/search.hook";
import Button from "../Button";
import Input from "../Input";
import { Container, Title } from "./styles";

const Navbar = () => {
  const { setQueryOptions } = useStream();

  return (
    <Container>
      <Title>Streaming App</Title>
      <Input
        style={{ width: 500 }}
        onChange={(value) =>
          setQueryOptions((prevState) => ({
            ...prevState,
            search_filter: value.target.innerText,
          }))
        }
      />
      <Button variant="secondary">Criar live</Button>
    </Container>
  );
};

export default Navbar;
