import styled, { css, keyframes } from 'styled-components';

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
  gap: 10px;
  padding: 10px 50px;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const CategoryThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 7px;
  overflow: hidden;
  animation-name: ${moveAnimation()};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const CategoryThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
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
  font-size: 34px;
  color: ${({ theme }) => theme.colors.yellow};
`;

export const CategoryThumbnailSubTitle = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(42vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
  height: 100%;
  overflow-y: scroll;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow};
  max-height: 170px;
  border-radius: 7px;
  overflow: hidden;
  animation-name: ${moveAnimation(undefined, '50px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
  cursor: pointer;
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
  padding: 2px 10px;
`;

export const ImageCard = styled.img`
  width: 100%;
  height: 100%;
  transition: all 300ms;
  object-fit: cover;
  cursor: pointer;

  ${CardContainer}:hover & {
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