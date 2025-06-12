import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${(props) => props.theme.spacing.xxl};
`;

export const Title = styled.h1`
  font-size: 8rem;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 6rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 4rem;
  }
`;

export const Message = styled.p`
  font-size: ${(props) => props.theme.fontSize.xl};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

export const HomeLink = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.xl};
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
