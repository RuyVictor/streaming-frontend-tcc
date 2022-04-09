import { IUser } from "./User";

export interface ISignInDTO {
    email: string;
    password: string;
}

export interface ISignUpDTO {
    email: string;
    password: string;
}

export interface ISignInData {
    user: IUser;
    data: IToken;
}

interface IToken {
    token: string;
    expires_at: string;
    refreshToken: string;
}