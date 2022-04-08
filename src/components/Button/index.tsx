import { ButtonHTMLAttributes, FC } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  expanded?: boolean;
  variant?: 'primary' | 'secondary';
};

const Button: FC<ButtonProps> = ({
    disabled = false,
    expanded = false,
    variant = 'primary',
    children,
    ...rest
}) => {
    return (
        <Container
            disabled={disabled}
            variant={variant}
            style={{width: expanded ? '100%' : undefined }}
            {...rest}
        >
            {children}
        </Container>
    );
};

export default Button;