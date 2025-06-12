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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl}
    ${(props) => props.theme.spacing.md};
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Content = styled.div`
  text-align: center;
  max-width: 800px;
  width: 100%;
  z-index: 1;
`;

export const Hero = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const GitHubIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
  animation: ${float} 3s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    filter: brightness(0) saturate(100%) invert(28%) sepia(88%) saturate(1695%)
      hue-rotate(214deg) brightness(95%) contrast(97%);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
  }
`;

export const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xxxl};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    #e73c7e
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  line-height: 1.2;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.xxl};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fontSize.xl};
  }
`;

export const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fontSize.md};
  }
`;

export const SearchSection = styled.div`
  margin: ${(props) => props.theme.spacing.xxl} 0;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;
