import { IMember } from "./Member";

export interface ISignInDTO {
    email: string;
    password: string;
}

export interface ISignUpDTO {
    email: string;
    password: string;
}

export interface ISignInData {
    user: IMember;
    data: IToken;
}

interface IToken {
    token: string;
    expires_at: string;
    refreshToken: string;
}