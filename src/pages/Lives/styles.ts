import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 20px;
  padding: 50px;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
  overflow-y: scroll;
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