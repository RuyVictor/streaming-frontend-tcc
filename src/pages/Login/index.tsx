import { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInDTO } from "../../models/Auth";
import { SignInSchema } from "../../utils/schemas/signin.schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthService } from "../../services";

import { Input, Button } from "../../components";
import { Container, InputsContainer, Title } from "./styles";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);

  const { register, handleSubmit, formState } = useForm<ISignInDTO>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data: ISignInDTO) => {
    console.log(data);
    try {
      setIsSigning(true);
      await signIn(data);
      toast.success("Logado com sucesso!");
      navigate("/home", { replace: true });
    } catch (err) {
      setIsSigning(false);
      toast.error("Erro ao fazer login!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <Title>Login</Title>
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

          <Button disabled={isSigning} type="submit" expanded>
            Entrar
          </Button>
        </InputsContainer>
      </form>
    </Container>
  );
};

export default Login;
