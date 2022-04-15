import { AxiosPromise } from 'axios';

import { ISignInDTO, ISignInData, ISignUpDTO } from '../models/Auth';

import api from './api';

const AuthService = {
  signIn(data?: ISignInDTO): AxiosPromise<ISignInData> {
    return api.post('/auth/signin', data);
  },

  signUp(data?: ISignUpDTO): AxiosPromise<ISignInData> {
    return api.post('/auth/signup', data);
  },

  refreshToken(data?: Omit<ISignInData, 'user' | 'accessToken'>): AxiosPromise<void> {
    return api.post('/auth/refresh-token', data);
  },

  revokeTokens(data?: Omit<ISignInData, 'user' | 'accessToken'>): AxiosPromise<void> {
    return api.post('/auth/revoke-token', data);
  },
};

export default AuthService;