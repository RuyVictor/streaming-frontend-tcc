import * as Yup from 'yup';

import { ISignInDTO } from '../../models/Auth';

export const SignInSchema: Yup.SchemaOf<ISignInDTO> = Yup.object().shape({
    email: Yup.string().email('Email digitado é inválido').required('Digite seu email'),
    password: Yup.string().required('Digite sua senha'),
});