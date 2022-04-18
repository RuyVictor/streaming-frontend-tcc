import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.black};
  height: calc(100% - 70px);
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

export const ChatContainer = styled.div`
  display: flex;
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
  height: 100%;
  animation-name: ${moveAnimation('-200px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;