import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 3.8rem;
  color: ${({ theme }) => theme.colors.black};
  margin: 2.181rem 0 2.2rem 0;
`;