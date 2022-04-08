import styled, { css } from 'styled-components';

interface InputProps {
  disabled: boolean;
  error: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputContainer = styled.input<InputProps>`
  border-radius: 3px;
  padding: 10px 20px;
  border-style: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  ${(props) =>
    props.error &&
    css`  
      border: 2px solid red;
    `}
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
`;

export const WarningMessage = styled.span`
  color: red;
  font-size: 14px;
`;