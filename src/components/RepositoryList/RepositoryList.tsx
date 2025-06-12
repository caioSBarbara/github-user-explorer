import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GitHubRepository, SortBy, SortOrder } from "../../types/github";
import {
  Container,
  Header,
  Title,
  SortControls,
  SortSelect,
  RepositoryGrid,
  RepositoryCard,
  RepoName,
  RepoDescription,
  RepoStats,
  Stat,
  Language,
  UpdatedDate,
} from "./RepositoryList.styles";
import { formatDate } from "../../utils/formatDate/formatDate";
import { useApp } from "@/hooks";

interface RepositoryListProps {
  repositories: GitHubRepository[];
  username: string;
}

const RepositoryList = ({ repositories, username }: RepositoryListProps) => {
  const navigate = useNavigate();
  const { setSortOptions } = useApp();
  const [sortBy, setSortBy] = useState<SortBy>("stars");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedRepositories = useMemo(() => {
    const sorted = [...repositories].sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;

      switch (sortBy) {
        case "stars":
          aValue = a.stargazers_count;
          bValue = b.stargazers_count;
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "updated":
          aValue = new Date(a.updated_at);
          bValue = new Date(b.updated_at);
          break;
        case "created":
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [repositories, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setSortOptions(newSortBy, sortOrder);
  };

  const handleOrderChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
    setSortOptions(sortBy, newSortOrder);
  };

  const handleRepositoryClick = (repoName: string) => {
    navigate(`/user/${username}/${repoName}`);
  };

  if (repositories.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Repositórios</Title>
        </Header>
        <p>Nenhum repositório público encontrado.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Repositórios ({repositories.length})</Title>
        <SortControls>
          <SortSelect
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortBy)}
          >
            <option value="stars">Estrelas</option>
            <option value="name">Nome</option>
            <option value="updated">Atualização</option>
            <option value="created">Criação</option>
          </SortSelect>
          <SortSelect
            value={sortOrder}
            onChange={(e) => handleOrderChange(e.target.value as SortOrder)}
          >
            <option value="desc">Decrescente</option>
            <option value="asc">Crescente</option>
          </SortSelect>
        </SortControls>
      </Header>

      <RepositoryGrid>
        {sortedRepositories.map((repo) => (
          <RepositoryCard
            key={repo.id}
            onClick={() => handleRepositoryClick(repo.name)}
          >
            <RepoName>{repo.name}</RepoName>
            {repo.description && (
              <RepoDescription>{repo.description}</RepoDescription>
            )}

            <RepoStats>
              <Stat>⭐ {repo.stargazers_count}</Stat>
              <Stat>🍴 {repo.forks_count}</Stat>
              {repo.language && <Language>{repo.language}</Language>}
            </RepoStats>

            <UpdatedDate>
              Atualizado em {formatDate(repo.updated_at)}
            </UpdatedDate>
          </RepositoryCard>
        ))}
      </RepositoryGrid>
    </Container>
  );
};

export default RepositoryList;
