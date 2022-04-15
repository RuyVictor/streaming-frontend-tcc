import styled, { keyframes } from 'styled-components';

const moveAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  font-size: 10px;
  margin: auto auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.yellow};
  background: linear-gradient(to right,  ${({ theme }) => theme.colors.yellow} 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: ${moveAnimation} 1.4s infinite linear;
  transform: translateZ(0);
  
  ::before {
    width: 50%;
    height: 50%;
    background: ${({ theme }) => theme.colors.yellow};
    border-radius: 100% 0 0 0;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    content: '';
  }

  ::after {
    background: ${({ theme }) => theme.colors.black};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;