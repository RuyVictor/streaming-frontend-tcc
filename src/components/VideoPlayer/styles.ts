import styled, { css } from 'styled-components';

interface IProps {
  inactive: boolean;
}

export const Container = styled.div<IProps>`
  display: flex;
  position: relative;
  height: 100%;

  span {
    position: absolute;
    text-align: center;
    z-index: 3;
    font-size: 50px;
    color: ${({ theme }) => theme.colors.yellow};
  }

  ${(props) =>
    props.inactive &&
    css`
      z-index: 2;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.colors.black};
    `}
`;

export const Video = styled.video`
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
`;