import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../models/User";
import { ISignInDTO, ISignUpDTO } from "../models/Auth";
import api from "../services/api";
import { AuthService } from "../services";

export enum StoragePrefix {
  user = "@streaming-app-tcc:user",
  accessToken = "@streaming-app-tcc:access-token",
  refreshToken = "@streaming-app-tcc:refresh-token",
  refreshTokenExp = "@streaming-app-tcc:refresh-token-exp",
}

type AuthContextData = {
  readonly user: IUser | undefined;
  isAuthenticated: boolean;
  signIn: (data: ISignInDTO) => Promise<void>;
  signUp: (data: ISignUpDTO) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userFromStorage = localStorage.getItem(StoragePrefix.user);
    const accessToken = localStorage.getItem(StoragePrefix.accessToken);

    if (accessToken && userFromStorage) {
      const user: IUser = JSON.parse(userFromStorage);

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      return user;
    }
    return undefined;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  async function signIn({ email, password }: ISignInDTO) {
    const { data } = await AuthService.signIn({
      email,
      password,
    });

    localStorage.setItem(StoragePrefix.user, JSON.stringify(data.user));
    localStorage.setItem(StoragePrefix.accessToken, data.accessToken);
    localStorage.setItem(StoragePrefix.refreshToken, data.refreshToken);
    localStorage.setItem(StoragePrefix.refreshTokenExp, String(data.refreshTokenExp));

    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

    setUser(data.user);
  }

  async function signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await AuthService.signUp({
      name,
      email,
      password,
    });

    localStorage.setItem(StoragePrefix.user, JSON.stringify(data.user));
    localStorage.setItem(StoragePrefix.accessToken, data.accessToken);
    localStorage.setItem(StoragePrefix.refreshToken, data.refreshToken);
    localStorage.setItem(StoragePrefix.refreshTokenExp, String(data.refreshTokenExp));

    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

    setUser(data.user);
  }

  async function logout() {
    const accessToken = localStorage.getItem(StoragePrefix.accessToken);
    const refreshToken = localStorage.getItem(StoragePrefix.refreshToken);

    if (accessToken && refreshToken) {
      await AuthService.revokeTokens({ accessToken, refreshToken });
  
      Object.values(StoragePrefix).forEach((item) => {
        localStorage.removeItem(item);
      });
  
      setUser(undefined);
  
      api.defaults.headers.common.Authorization = "";
    }
  }

  useEffect(() => {
    const expires_at = localStorage.getItem(StoragePrefix.refreshTokenExp);

    if (expires_at) {
      if (Date.now() >= parseInt(expires_at) * 1000) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
