import styled, { css, keyframes } from 'styled-components';

interface IProps {
  inactive: boolean;
}

const moveAnimation = (pixelDistance: string) => keyframes`
  from { 
    opacity: 0;
    transform: translateY(${pixelDistance});
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const VideoContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
  background-color: ${({ theme }) => theme.colors.yellow};
  animation-name: ${moveAnimation('200px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const StreamInfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding-inline: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const WrapperContainer = styled.div<IProps>`
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

export const StreamTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StreamDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StreamHost = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;