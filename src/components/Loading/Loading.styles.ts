import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxl};
  min-height: 200px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${(props) => props.theme.colors.gray[200]};
  border-top: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const Text = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.fontSize.md};
`;
