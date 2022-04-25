import React, {
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from "react";
import { IconType } from "react-icons";
import { BsSearch } from "react-icons/bs";
import Button from "../Button";
import {
  Container,
  HorizontalContainer,
  InputContainer,
  InputWrapper,
  Label,
  MaxLengthMessage,
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
      maxLength,
      defaultValue,
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
    function useCombinedRefs(...refs: any) {
      const targetRef = React.useRef();

      React.useEffect(() => {
        refs.forEach((ref: any) => {
          if (!ref) return;

          if (typeof ref === "function") {
            ref(targetRef.current);
          } else {
            ref.current = targetRef.current;
          }
        });
      }, [refs]);

      return targetRef;
    }

    const inputRef = useRef<React.InputHTMLAttributes<HTMLInputElement>>(ref);
    const combinedRef = useCombinedRefs(ref, inputRef);

    const [inputLength, setInputLength] = useState(0);

    useEffect(() => {
      const typedCombinedRef =
        combinedRef.current as unknown as React.InputHTMLAttributes<HTMLInputElement>;
      setInputLength(typedCombinedRef?.value?.toString().length ?? 0);
    }, [ref]);

    return (
      <Container style={{ width: width }}>
        <Label>{label}</Label>
        <InputWrapper variant={variant} disabled={disabled} error={!!error}>
          {variant === "search" ? <BsSearch /> : leftIcon}
          <InputContainer
            ref={combinedRef as any}
            {...rest}
            maxLength={maxLength}
            onChange={(event) => setInputLength(event.target.value.length)}
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
        {(error || maxLength) && (
          <HorizontalContainer>
            {error && <WarningMessage>{error}</WarningMessage>}
            {maxLength && <MaxLengthMessage>{inputLength + "/" + maxLength}</MaxLengthMessage>}
          </HorizontalContainer>
        )}
      </Container>
    );
  }
);

export default Input;
