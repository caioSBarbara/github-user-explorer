import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xxl};
  text-align: center;
  min-height: 300px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
  animation: ${bounce} 2s infinite;

  img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }
`;

export const Message = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSize.xl};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  margin-bottom: ${(props) => props.theme.spacing.md};
  max-width: 500px;
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.fontSize.md};
  line-height: 1.6;
  max-width: 450px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const RetryButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.md};

  &:hover {
    background: ${(props) => props.theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;
