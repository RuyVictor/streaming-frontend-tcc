import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  .container {
    display: flex;
  }

  .item {
    display: flex;
    color: black;
    margin: 0.5rem;
    border-radius: 4px;
    border: 1px solid #717171;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.secondary};
    }

    &::marker {
      color: rgba(0, 0, 0, 0);
    }
  }

  .item a {
    flex: 1;
    padding: 0.6rem 1.2rem;
  }

  .item.active {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 800;
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.secondary};
  }

  .disabled {
    display: none;
  }
`;
