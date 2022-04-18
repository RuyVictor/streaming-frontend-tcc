import { FC } from 'react';
import { StyledToast } from './styles';

const Toast: FC = () => <StyledToast hideProgressBar style={{zIndex: 99999}}/>;
export default Toast;