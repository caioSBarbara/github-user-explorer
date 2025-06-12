import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderContainer = styled.header`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.backgroundSecondary} 0%,
    ${(props) => props.theme.colors.background} 100%
  );
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${(props) => props.theme.shadows.sm};
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    text-decoration: none;
    transition: transform ${(props) => props.theme.transitions.fast};

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0366d6, #0366d6);
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.xs};

  img {
    width: 100%;
    height: 100%;
    filter: brightness(0) invert(1);
  }
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;

  .primary {
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.text};
  }

  .secondary {
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.textSecondary};
    margin-top: -2px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    .primary {
      font-size: ${(props) => props.theme.fontSize.md};
    }
    .secondary {
      font-size: ${(props) => props.theme.fontSize.xs};
    }
  }
`;
