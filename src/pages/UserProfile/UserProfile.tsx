import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import useGetUserRepositories from "../../hooks/useGetUserRepositories";
import UserInfo from "../../components/UserInfo/UserInfo";
import RepositoryList from "../../components/RepositoryList/RepositoryList";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Container } from "./UserProfile.styles";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUser({
    username: username ?? "",
    enabled: !!username,
  });

  const {
    repositories,
    isLoading: reposLoading,
    error: reposError,
  } = useGetUserRepositories({
    username: username ?? "",
    enabled: !!username,
  });

  const isLoading = userLoading || reposLoading;
  const error = userError || reposError;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Usuário não encontrado"
        subtitle="Hmm... Parece que esse usuário não existe no GitHub. Que tal verificar se o nome está correto ou tentar outro?"
        onRetry={() => navigate(`/`)}
        icon="/userNotFound.png"
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container>
      <UserInfo user={user} />
      <RepositoryList repositories={repositories} username={username ?? ""} />
    </Container>
  );
};

export default UserProfile;
