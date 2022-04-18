import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  height: calc(100% - 70px);
  padding: 30px;
  overflow-y: hidden;
`;

const moveAnimation = keyframes`
  from { 
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 480px;
  max-height: 620px;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  align-items: center;
  gap: 10px;
  animation-name: ${moveAnimation};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const Title = styled.h1`
  font-size: 3.8rem;
  color: ${({ theme }) => theme.colors.black};
  margin: 2.181rem 0 2.2rem 0;
`;
