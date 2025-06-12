import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useApp } from "../../hooks";
import {
  Container,
  Hero,
  Title,
  Subtitle,
  Content,
  SearchSection,
  GitHubIcon,
} from "./Home.styles";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading, setError } = useApp();
  const [search, setSearch] = useState<string>("");

  const handleSearch = async (username: string): Promise<void> => {
    if (!username.trim()) {
      setError("Por favor, digite um nome de usuário");
      return;
    }
    setLoading(true);
    navigate(`/user/${username.trim()}`);
  };

  return (
    <Container>
      <Content>
        <Hero>
          <GitHubIcon>
            <img src="/github-icon.svg" alt="GitHub" />
          </GitHubIcon>
          <Title>GitHub User Explorer</Title>
          <Subtitle>
            Descubra perfis incríveis e explore repositórios fascinantes do
            GitHub de forma simples e intuitiva.
          </Subtitle>
        </Hero>

        <SearchSection>
          <SearchForm
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            placeholder="Digite o nome do usuário do GitHub..."
          />
        </SearchSection>
      </Content>
    </Container>
  );
};

export default Home;
