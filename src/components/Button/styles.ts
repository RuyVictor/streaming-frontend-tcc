import styled, { css } from 'styled-components';

interface InputProps {
  disabled: boolean;
  variant: string;
}

export const Container = styled.button<InputProps>`
  padding: 5px 20px;
  border-radius: 3px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.yellow};
  transition: all 300ms;

  :hover {
    opacity: 0.8;
  }

  ::after {
    content: "";
    background-color: #FFBA10;
    border-color: black;
  }

  ${(props) =>
    props.variant === "primary" ? 
    css`
      color: ${({ theme }) => theme.colors.black};
      background-color: ${({ theme }) => theme.colors.yellow};
    ` :
    css`
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.black};
    `
  }

  ${(props) =>
    props.disabled &&
    css`
        border-width: 2px;
        border-color: red;
    `}
`;