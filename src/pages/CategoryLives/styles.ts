import styled, { keyframes } from 'styled-components';

const moveAnimation = (distanceX?: string, distanceY?: string) => keyframes`
  from { 
    opacity: 0;
    ${distanceX && `transform: translateX(${distanceX})`};
    ${distanceY && `transform: translateY(${distanceY})`};
  }
  to {
    opacity: 1;
    transform: translateX(0px);
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 50px;
  height: calc(100% - 70px);
  background-color: ${({ theme }) => theme.colors.black};
`;

export const CategoryThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
  animation-name: ${moveAnimation()};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const CategoryThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
`;

export const CategoryThumbnailInfoContainer = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 22px;
  display: flex;
  flex-direction: column;
`;

export const CategoryThumbnailTitle = styled.span`
  font-size: 60px;
  font-weight: 600;
  text-shadow: 1px 2px 11px rgba(255,255,255,0.3);
  color: ${({ theme }) => theme.colors.yellow};
`;

export const CategoryThumbnailSubTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;