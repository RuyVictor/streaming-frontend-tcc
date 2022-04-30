import styled, { css } from 'styled-components';

interface InputProps {
  disabled: boolean;
  variant: string;
}

export const Container = styled.button<InputProps>`
  padding: 5px 20px;
  border-radius: 5px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 300ms;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.4;
  }

  ::after {
    content: "";
    background-color: #FFBA10;
    border-color: black;
  }

  ${(props) =>
    props.variant === "primary" ? 
    css`
      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};
    ` :
    css`
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.secondary};
    `
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
      :hover {
        opacity: 0.4;
      }
      cursor: not-allowed;
    `}
`;