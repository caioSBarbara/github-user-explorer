import { Container, Spinner, Text } from "./Loading.styles";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Carregando..." }: LoadingProps) => {
  return (
    <Container>
      <Spinner />
      <Text>{message}</Text>
    </Container>
  );
};

export default Loading;
