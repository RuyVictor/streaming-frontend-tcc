import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 20px;
  height: 70px;
  top: 0;
  align-items: center;
  position: sticky;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const Title = styled.span`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;

export const ProfileName = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
`;