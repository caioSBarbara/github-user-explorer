import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  border: 1px solid ${(props) => props.theme.colors.border};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${(props) => props.theme.spacing.lg};
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

export const Avatar = styled.div`
  flex-shrink: 0;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid ${(props) => props.theme.colors.border};

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      width: 120px;
      height: 120px;
    }
  }
`;

export const UserDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const Name = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.xs};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

export const Username = styled.h2`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const Bio = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.text};
  line-height: 1.6;
`;

export const Stats = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const StatNumber = styled.span`
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
`;

export const StatLabel = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

export const Email = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const Website = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.colors.primaryHover};
    }
  }
`;

export const JoinDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSize.md};
  color: ${(props) => props.theme.colors.textSecondary};
`;
