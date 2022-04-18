import { FC } from "react";
import { Zoom } from 'react-toastify';
import { StyledToast } from "./styles";

const Toast: FC = () => (
  <StyledToast
  hideProgressBar
  closeButton
  position="top-center"
  transition={Zoom}
  autoClose={2000}
  limit={3}
  style={{ zIndex: 99999 }} />
);
export default Toast;
