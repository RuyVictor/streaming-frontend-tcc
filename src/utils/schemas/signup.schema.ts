import * as Yup from 'yup';

import { ISignUpDTO } from '../../models/Auth';

export const SignUpSchema: Yup.SchemaOf<ISignUpDTO> = Yup.object().shape({
    name: Yup.string().required('Digite seu nome de usuário'),
    email: Yup.string().email('Email digitado é inválido').required('Digite seu email'),
    password: Yup.string().required('Digite sua senha').min(6, 'A senha deve conter no mínimo 6 caracteres'),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Senha não confere.')
});