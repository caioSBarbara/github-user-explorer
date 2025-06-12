import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

export const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.text};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

export const SortControls = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const SortSelect = styled.select`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSize.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const RepositoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

export const RepositoryCard = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const RepoName = styled.h3`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

export const RepoDescription = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.5;
  flex: 1;
`;

export const RepoStats = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

export const Stat = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const Language = styled.span`
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const UpdatedDate = styled.span`
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: auto;
`;
