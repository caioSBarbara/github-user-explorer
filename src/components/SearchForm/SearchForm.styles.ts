import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSize.md};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: border-color ${(props) => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textMuted};
  }
`;

export const Button = styled.button`
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSize.md};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color ${(props) => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;
