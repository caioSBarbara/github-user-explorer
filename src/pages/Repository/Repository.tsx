import { useParams, Link } from "react-router-dom";
import { useGetRepository } from "../../hooks";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {
  Container,
  BackLink,
  Header,
  RepoTitle,
  Description,
  Stats,
  Stat,
  StatLabel,
  StatValue,
  Language,
  ExternalLink,
  InfoGrid,
  InfoCard,
  InfoTitle,
  InfoValue,
} from "./Repository.styles";
import { formatSize } from "../../utils/formatSize/formatSize";
import { formatDate } from "../../utils/formatDate/formatDate";

const Repository = () => {
  const { username, repository } = useParams();

  const {
    repository: repoData,
    isLoading,
    error,
    hasParams,
  } = useGetRepository({
    owner: username ?? "",
    repo: repository ?? "",
    enabled: !!username && !!repository,
  });

  if (isLoading) {
    return <Loading message="Carregando detalhes do repositório..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message || "Erro ao carregar repositório"}
        subtitle="Verifique se o repositório existe e tente novamente."
      />
    );
  }

  if (!hasParams || !repoData) {
    return null;
  }

  return (
    <Container>
      <BackLink>
        <Link to={`/user/${username}`}>← Voltar para o perfil</Link>
      </BackLink>

      <Header>
        <div>
          <RepoTitle>{repoData.name}</RepoTitle>
          {repoData.description && (
            <Description>{repoData.description}</Description>
          )}
        </div>

        <ExternalLink>
          <a href={repoData.html_url} target="_blank" rel="noopener noreferrer">
            🔗 Ver no GitHub
          </a>
        </ExternalLink>
      </Header>

      <Stats>
        <Stat>
          <StatValue>{repoData.stargazers_count}</StatValue>
          <StatLabel>Estrelas</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{repoData.forks_count}</StatValue>
          <StatLabel>Forks</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{repoData.watchers_count}</StatValue>
          <StatLabel>Watchers</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{repoData.open_issues_count}</StatValue>
          <StatLabel>Issues</StatLabel>
        </Stat>
      </Stats>

      {repoData.language && (
        <Language>
          Linguagem principal: <strong>{repoData.language}</strong>
        </Language>
      )}

      <InfoGrid>
        <InfoCard>
          <InfoTitle>Criado em</InfoTitle>
          <InfoValue>{formatDate(repoData.created_at)}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Última atualização</InfoTitle>
          <InfoValue>{formatDate(repoData.updated_at)}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Tamanho</InfoTitle>
          <InfoValue>{formatSize(repoData.size)}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Branch padrão</InfoTitle>
          <InfoValue>{repoData.default_branch}</InfoValue>
        </InfoCard>

        {repoData.license && (
          <InfoCard>
            <InfoTitle>Licença</InfoTitle>
            <InfoValue>{repoData.license.name}</InfoValue>
          </InfoCard>
        )}

        <InfoCard>
          <InfoTitle>Visibilidade</InfoTitle>
          <InfoValue>{repoData.private ? "Privado" : "Público"}</InfoValue>
        </InfoCard>
      </InfoGrid>
    </Container>
  );
};

export default Repository;
