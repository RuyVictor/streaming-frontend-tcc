import styled from 'styled-components';
import { RiErrorWarningFill } from "react-icons/ri";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
  gap: 10px;
`;

export const Icon = styled(RiErrorWarningFill)`
  color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`;

export const Span = styled.span`
  font-size: 16px;
`;