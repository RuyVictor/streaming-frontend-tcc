import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(42vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.yellow};
  gap: 10px;
  border-radius: 5px;
  overflow: hidden;
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
  padding: 20px;
`;

export const ImageCard = styled.img`
  width: 100%;
  height: 200px;
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