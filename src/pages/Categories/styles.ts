import styled, { css, keyframes } from 'styled-components';

interface IProps {
  categoriesLength: number;
  selected: boolean;
}

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

export const SubTitle = styled.span`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  gap: 10px;
  padding: 10px 50px;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
  height: 100%;
`;

export const PrimaryCategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const PrimaryCategoryCardContainer = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 170px;
  height: 100px;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation-name: ${moveAnimation('-20px', undefined)};
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-duration: 0.2s;
  cursor: pointer;

  transition: all 0.2s ease-out;

  ${({categoriesLength}) => {
    let offset = 0;
    const array = Array.from({length: categoriesLength}, (v, index) => {
      offset += 0.2;
      return `:nth-child(${index + 1}) { animation-delay: ${offset.toFixed(1)}s };`
    })
    return array.join('\r\n');
  }}

  ${(props) =>
    props.selected &&
    css`
      outline: 5px solid ${({ theme }) => theme.colors.yellow};
      box-shadow: 0px 0px 30px 0px rgba(255,255,255,0.3);
  `}
`;

export const SubCategoriesCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
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

export const CategoryInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 2px 10px;
`;

export const SubCategoryInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
`;

export const ImageCard = styled.img`
  width: 100%;
  height: 100%;
  transition: all 300ms;
  object-fit: cover;

  ${SubCategoriesCardContainer}:hover & {
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