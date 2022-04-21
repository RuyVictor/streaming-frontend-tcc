import { FC, forwardRef, InputHTMLAttributes } from "react";
import { Container, Label, SelectContainer, WarningMessage } from "./styles";

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  disabled?: boolean;
  options?: { id: string; label: string }[];
}

const Select = forwardRef(
  (
    { label, error, disabled, options, ...rest }: IProps,
    ref: any
  ) => (
    <Container>
      <Label>{label}</Label>
      <SelectContainer ref={ref} error={!!error} disabled={disabled} {...rest}>
        <option value="" disabled hidden>
          Escolha aqui
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </SelectContainer>
      {error && <WarningMessage>{error}</WarningMessage>}
    </Container>
  )
);

export default Select;
