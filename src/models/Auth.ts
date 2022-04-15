import { IUser } from "./User";

export interface ISignInDTO {
    email: string;
    password: string;
}

export interface ISignUpDTO {
    name: string;
    email: string;
    password: string;
    confirm_password?: string;
}

export interface ISignInData {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}