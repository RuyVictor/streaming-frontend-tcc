import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 5px 20px;
  top: 0;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  z-index: 9999;
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

export const ProfileName = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;