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

export const ChatContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.yellow};
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
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