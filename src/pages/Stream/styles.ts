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
  height: 100%;
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  border-radius: 5px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
  height: 100%;
  animation-name: ${moveAnimation('200px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const ChatContainer = styled.div`
  display: flex;
  width: 400px;
  border-radius: 5px;
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

export const CardTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
`;

export const CardDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;