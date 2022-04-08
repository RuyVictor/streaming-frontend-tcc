import { InputHTMLAttributes, forwardRef } from 'react';
import { Container, InputContainer, Label, WarningMessage } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    disabled?: boolean;
    label?: string;
};

const Input = forwardRef(({disabled = false, label, error, children, ...rest}: InputProps, ref: any) => (
    <Container>
        <Label>{label}</Label>
        <InputContainer
            disabled={disabled}
            error={!!error}
            ref={ref}
            {...rest}
        >
            {children}
        </InputContainer>
        <WarningMessage>
        {error}
        </WarningMessage>
    </Container>
));

export default Input;