import {
  Container,
  Icon,
  Message,
  Subtitle,
  RetryButton,
} from "./ErrorMessage.styles";

interface ErrorMessageProps {
  message: string;
  subtitle?: string;
  onRetry?: () => void;
  icon?: any;
}

const ErrorMessage = ({
  message,
  subtitle,
  onRetry,
  icon,
}: ErrorMessageProps) => {
  return (
    <Container>
      {icon && (
        <Icon>
          <img src={icon} alt="icon" />
        </Icon>
      )}
      <Message>{message}</Message>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {onRetry && <RetryButton onClick={onRetry}>Tentar novamente</RetryButton>}
    </Container>
  );
};

export default ErrorMessage;
