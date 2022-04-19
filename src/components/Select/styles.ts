import styled, { css } from 'styled-components';

interface IProps {
  disabled?: boolean;
  error?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const SelectContainer = styled.select<IProps>`
  // appearance: none;
  outline: none;
  // Additional resets for further consistency
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid black;
  height: 45px;
  padding: 0px 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.white};
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;

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