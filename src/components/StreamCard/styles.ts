import styled, { css, keyframes } from 'styled-components';
import ReactHlsPlayer from 'react-hls-player/dist';

interface InputProps {
  disabled: boolean;
  variant: string;
}

const moveAnimation = keyframes`
  from { 
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation-name: ${moveAnimation};
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-duration: 1s;
  cursor: pointer;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const VerticalContainer = styled.div`
  width: 70%;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 16px;
`;

export const ImageCard = styled(ReactHlsPlayer)`
  width: 100%;
  object-fit: cover;
  transition: all 300ms;

  ${Container}:hover & {
    opacity: 0.9;
    box-shadow: 0px 0px 105px 0px rgba(255,25,221,0.9);
  }
`;

export const Title = styled.p`
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
`;

export const UserName = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Category = styled.p`
  font-size: 12px;
  padding: 0px 3px;
  border-radius: 3px;
  opacity: 0.8;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.black};
`;