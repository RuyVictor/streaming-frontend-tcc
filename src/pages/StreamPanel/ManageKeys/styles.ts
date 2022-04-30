import styled, { keyframes } from "styled-components";

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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  width: 500px;
  height: min-content;
  overflow: hidden;
  animation-name: ${moveAnimation("200px")};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const InputsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  max-width: 1000px;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
