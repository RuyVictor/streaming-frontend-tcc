import { AxiosPromise } from 'axios';

import { ISignInDTO, ISignInData, ISignUpDTO } from '../models/Auth';

import api from './api';

const AuthService = {
  signIn(data?: ISignInDTO): AxiosPromise<ISignInData> {
    return api.post('/signin', { params: data });
  },

  signUp(data?: ISignUpDTO): AxiosPromise<ISignInData> {
    return api.post('/signup', { params: data });
  },
};

export default AuthService;