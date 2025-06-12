import { formatDate } from "@/utils/formatDate/formatDate";
import { GitHubUser } from "../../types/github";
import {
  Container,
  Avatar,
  UserDetails,
  Name,
  Username,
  Bio,
  Stats,
  Stat,
  StatNumber,
  StatLabel,
  Email,
  Location,
  Website,
  JoinDate,
} from "./UserInfo.styles";

interface UserInfoProps {
  user: GitHubUser;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <Container>
      <Avatar>
        <img src={user.avatar_url} alt={`${user.login} avatar`} />
      </Avatar>

      <UserDetails>
        <div>
          {user.name && <Name>{user.name}</Name>}
          <Username>@{user.login}</Username>
          {user.bio && <Bio>{user.bio}</Bio>}
        </div>

        <Stats>
          <Stat>
            <StatNumber>{user.followers}</StatNumber>
            <StatLabel>Seguidores</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{user.following}</StatNumber>
            <StatLabel>Seguindo</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{user.public_repos}</StatNumber>
            <StatLabel>Repositórios</StatLabel>
          </Stat>
        </Stats>

        <div>
          {user.email && <Email>📧 {user.email}</Email>}
          {user.location && <Location>📍 {user.location}</Location>}
          {user.blog && (
            <Website>
              🌐{" "}
              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                {user.blog}
              </a>
            </Website>
          )}
          <JoinDate>📅 Membro desde {formatDate(user.created_at)}</JoinDate>
        </div>
      </UserDetails>
    </Container>
  );
};

export default UserInfo;
