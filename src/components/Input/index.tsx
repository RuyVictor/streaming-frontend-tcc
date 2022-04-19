import React, { InputHTMLAttributes, forwardRef, useRef } from "react";
import { IconType } from "react-icons";
import { BsSearch } from "react-icons/bs";
import Button from "../Button";
import {
  Container,
  InputContainer,
  InputWrapper,
  Label,
  WarningMessage,
} from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  disabled?: boolean;
  label?: string;
  width?: number;
  leftIcon?: IconType;
  rightIcon?: IconType;
  variant?: "normal" | "search";
  onSearch?: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
};

const Input = forwardRef(
  (
    {
      disabled = false,
      label,
      width,
      leftIcon,
      rightIcon,
      variant = "normal",
      onSearch,
      error,
      children,
      ...rest
    }: InputProps,
    ref: any
  ) => {
    const inputRef = useRef<React.InputHTMLAttributes<HTMLInputElement>>();

    return (
      <Container style={{width: width}}>
        <Label>{label}</Label>
        <InputWrapper
          variant={variant}
          disabled={disabled}
          error={!!error}
        >
          {variant === "search" ? <BsSearch /> : leftIcon}
          <InputContainer
            ref={ref ?? inputRef}
            {...rest}
            onKeyUp={(event) => {
              if (event.key === "Enter" && onSearch) {
                onSearch(inputRef.current!);
              }
            }}
          >
            {children}
          </InputContainer>
          {rightIcon}
          {variant === "search" && (
            <Button
              style={{ padding: "5px 20px", marginRight: -12, fontSize: 15 }}
              onClick={(event) => onSearch && onSearch(inputRef.current!)}
            >
              Buscar
            </Button>
          )}
        </InputWrapper>
        {error && <WarningMessage>{error}</WarningMessage>}
      </Container>
    );
  }
);

export default Input;
