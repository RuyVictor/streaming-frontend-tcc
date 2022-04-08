import { AxiosPromise } from 'axios';

import { ISignInDTO, ISignInData } from '../models/Auth';

import api from './api';

const AuthService = {
  signIn(data?: ISignInDTO): AxiosPromise<ISignInData> {
    return api.post('/signin', { params: data });
  },

  signUp(data?: ISignInDTO): AxiosPromise<ISignInData> {
    return api.post('/signup', { params: data });
  },
};

export default AuthService;