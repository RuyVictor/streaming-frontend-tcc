import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 5px 20px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.span`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;