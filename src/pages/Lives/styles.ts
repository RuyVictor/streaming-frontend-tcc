import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(42vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
  overflow-y: scroll;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow};
  gap: 10px;
  max-height: 300px;
  border-radius: 7px;
  overflow: hidden;
  animation-name: ${moveAnimation};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CardInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
`;

export const ImageCard = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 300ms;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    box-shadow: 0px 0px 105px 0px rgba(255,25,221,0.9);
  }
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