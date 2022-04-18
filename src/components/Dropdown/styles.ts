import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const LinksContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px; // borda
  border: 2px #dbdbdb solid;
  border-radius: 7px;
  overflow: hidden;
  right: -10px;
  background-color: rgba(255,255,255,0.8);
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
  z-index: 1;

  div {
    color: black;
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background-color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
  }

  div:hover {
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;