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
  height: calc(100% - 70px);
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;