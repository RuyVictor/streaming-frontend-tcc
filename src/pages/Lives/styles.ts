import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  background-color: ${({ theme }) => theme.colors.black};
  padding: 50px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(38vh, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
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