import styled, { css, keyframes } from 'styled-components';
import { BsCameraReelsFill } from "react-icons/bs";

interface IProps {
  disabled: boolean;
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
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
  animation-name: ${moveAnimation('-200px')};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 15px 10px;
  gap: 10px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const MessageContainer = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.black};
`;

export const Message = styled.span`
  font-size: 14px;
  word-break: break-word;
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.8;
`;

export const ActionsContainer = styled.div<IProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.yellow};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`;

export const CameraIcon = styled(BsCameraReelsFill)`
  flex-shrink: 0;
  font-size: 10px;
  margin-top: 7px;
  color: red;
`;