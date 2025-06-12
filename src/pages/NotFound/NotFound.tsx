import { Link } from "react-router-dom";
import { Container, Title, Message, HomeLink } from "./NotFound.styles";

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Message>Página não encontrada</Message>
      <HomeLink>
        <Link to="/">Voltar para o início</Link>
      </HomeLink>
    </Container>
  );
};

export default NotFound;
