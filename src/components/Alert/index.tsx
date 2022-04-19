import { FC } from "react";
import { Container, Icon, Span } from "./styles";

const Alert: FC = ({ children }) => (
  <Container>
    <Icon size={24}/>
    <Span>{children}</Span>
  </Container>
);
export default Alert;
