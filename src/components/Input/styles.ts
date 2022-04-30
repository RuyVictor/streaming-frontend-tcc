import styled, { css } from 'styled-components';

interface InputProps {
  disabled: boolean;
  variant: string;
  error: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

export const InputWrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 45px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  ${(props) =>
    props.variant === "normal" ?
    css`  
      padding: 0px;
    ` :
    css`  
      padding: 0px 20px;
    ` 
  }

  ${(props) =>
    props.error &&
    css`  
      border: 2px solid red;
    `}

  ${(props) =>
    props.disabled &&
    css`  
      pointer-events: none;
    `}
`;

export const InputContainer = styled.input`
  margin-inline: 20px;
  width: 100%;
  border-style: none;
  background-color: transparent;
`;

export const Spacer = styled.div`
  margin-inline: 10px;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-size: 16px;
`;

export const WarningMessage = styled.span`
  color: red;
  font-size: 14px;
`;

export const MaxLengthMessage = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;