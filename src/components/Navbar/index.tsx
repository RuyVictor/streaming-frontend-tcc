import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";
import { useStream } from "../../hooks/stream.hook";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Input from "../Input";
import { Container, HorizontalContainer, ProfileName, Title } from "./styles";

const Navbar = () => {
  const { setQueryOptions } = useStream();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <HorizontalContainer>
        <Title>Streaming App</Title>
        <Button variant="secondary" onClick={() => navigate("/lives")}>
          Em alta
        </Button>
        <Button variant="secondary" onClick={() => navigate("/categories")}>
          Categorias
        </Button>
      </HorizontalContainer>
      <Input
        variant="search"
        width={500}
        onSearch={(event) => {
          setQueryOptions((prevState) => ({
            ...prevState,
            query: event.value?.toString() ?? "",
          }));
          navigate("/lives");
        }}
      />
      <HorizontalContainer style={{ justifyContent: "flex-end" }}>
        {isAuthenticated ? (
          <Dropdown
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            activateElement={
              <ProfileName
                onClick={() => setModalOpen((prevState) => !prevState)}
              >
                {user?.name}
              </ProfileName>
            }
            links={[
              {
                element: <span>Meu painel</span>,
                onClick: () => navigate("/my-panel"),
              },
              {
                element: <span>Sair</span>,
                onClick: () => {
                  logout();
                  navigate("/", { replace: true });
                },
              },
            ]}
          />
        ) : (
          <>
            <Button variant="secondary" onClick={() => navigate("/signin")}>
              Fazer Login
            </Button>
            <Button variant="secondary" onClick={() => navigate("/signup")}>
              Cadastre-se
            </Button>
          </>
        )}
      </HorizontalContainer>
    </Container>
  );
};

export default Navbar;
