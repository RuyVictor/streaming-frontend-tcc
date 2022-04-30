import styled, { css, keyframes } from 'styled-components';

interface IProps {
  inactive: boolean;
}

const moveAnimation = (pixelDistance: string) => keyframes`
  from { 
    opacity: 0;
    transform: translateY(${pixelDistance});
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 1000px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
  // background-color: ${({ theme }) => theme.colors.primary};
  animation-name: ${moveAnimation('200px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const WrapperContainer = styled.div<IProps>`
  position: relative;

  ${(props) =>
    props.inactive &&
    css`
      aspect-ratio: 16 /9;
      z-index: 2;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.colors.secondary};
    `}
  
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    z-index: 3;
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StreamInfoContainer = styled.div`
  display: flex;
  height: 70px;
  align-items: center;
  gap: 10px;
  padding-inline: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const StreamTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const StreamDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const StreamHost = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-inline: 15px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;