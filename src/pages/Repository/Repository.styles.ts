import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xl};
`;

export const BackLink = styled.div`
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    font-weight: ${(props) => props.theme.fontWeight.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

export const RepoTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xxxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.xxl};
  }
`;

export const Description = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
`;

export const ExternalLink = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.lg};
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    text-decoration: none;
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    transition: background-color ${(props) => props.theme.transitions.fast};

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryHover};
    }
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: ${(props) => props.theme.spacing.lg};
    padding: ${(props) => props.theme.spacing.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  text-align: center;
`;

export const StatValue = styled.span`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
`;

export const StatLabel = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const Language = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-left: 4px solid ${(props) => props.theme.colors.primary};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.md};
  }
`;

export const InfoCard = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export const InfoTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.text};
`;
