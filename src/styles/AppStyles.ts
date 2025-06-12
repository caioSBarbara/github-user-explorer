import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    padding: ${(props) => props.theme.spacing.lg} 0;

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      padding: ${(props) => props.theme.spacing.md} 0;
    }
  }
`;
