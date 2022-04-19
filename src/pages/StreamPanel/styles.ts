import styled, { css, keyframes } from "styled-components";

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

interface IProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.black};
  height: calc(100% - 70px);
  overflow: hidden;
`;

export const VideoContainer = styled.div`
  flex: 1;
  border-radius: 10px;
  max-width: 1000px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
  background-color: ${({ theme }) => theme.colors.yellow};
  animation-name: ${moveAnimation("200px")};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const StreamInfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const StreamTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StreamDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StreamHost = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  gap: 2px;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
  animation-name: ${moveAnimation("-200px")};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const MenuItem = styled.div<IProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 10px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.black};
  transition: all 300ms;
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: ${({ theme }) => theme.colors.white};
    `}
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
