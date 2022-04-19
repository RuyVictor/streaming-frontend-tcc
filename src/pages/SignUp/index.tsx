import { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpDTO } from "../../models/Auth";
import { SignUpSchema } from "../../utils/schemas/signup.schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Input, Button } from "../../components";
import { Container, InputsContainer, Title } from "./styles";

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);

  const { register, handleSubmit, formState } = useForm<ISignUpDTO>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: ISignUpDTO) => {
    try {
      setIsSigning(true);
      await signUp(data);
      toast.success("Registrado com sucesso!");
      navigate("/lives", { replace: true });
    } catch (err) {
      setIsSigning(false);
      toast.error("Erro ao fazer login!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <Title>Registrar</Title>
          <Input
            label="Nome de usuário"
            {...register("name")}
            error={formState.errors.name?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            error={formState.errors.email?.message}
          />
          <Input
            label="Senha"
            {...register("password")}
            error={formState.errors.password?.message}
          />
          <Input
            label="Confirmar senha"
            {...register("confirm_password")}
            error={formState.errors.confirm_password?.message}
          />

          <Button disabled={isSigning} type="submit" expanded>
            Entrar
          </Button>
        </InputsContainer>
      </form>
    </Container>
  );
};

export default SignUp;
