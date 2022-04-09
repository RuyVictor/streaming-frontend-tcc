import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../models/User";
import { ISignInDTO, ISignUpDTO } from "../models/Auth";
import api from "../services/api";
import { AuthService } from "../services";

enum StoragePrefix {
  member = "@streaming-app-tcc:member",
  token = "@streaming-app-tcc:token",
  tokenExp = "@streaming-app-tcc:token-exp",
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
    const userFromStorage = localStorage.getItem(StoragePrefix.member);
    const token = localStorage.getItem(StoragePrefix.token);

    if (token && userFromStorage) {
      const user: IUser = JSON.parse(userFromStorage);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

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

    localStorage.setItem(StoragePrefix.member, JSON.stringify(data.user));
    localStorage.setItem(StoragePrefix.token, data.data.token);
    localStorage.setItem(StoragePrefix.tokenExp, data.data.expires_at);

    api.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;

    setUser(data.user);
  }

  async function signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await AuthService.signUp({
      name,
      email,
      password,
    });

    localStorage.setItem(StoragePrefix.member, JSON.stringify(data.user));
    localStorage.setItem(StoragePrefix.token, data.data.token);
    localStorage.setItem(StoragePrefix.tokenExp, data.data.expires_at);

    api.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;

    setUser(data.user);
  }

  function logout() {
    Object.values(StoragePrefix).forEach((item) => {
      localStorage.removeItem(item);
    });

    setUser(undefined);

    api.defaults.headers.common.Authorization = "";
  }

  useEffect(() => {
    const expires_at = localStorage.getItem(StoragePrefix.tokenExp);

    if (expires_at) {
      const now = new Date();
      const convertedDate: Date = new Date(expires_at);
      now >= convertedDate && logout();
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
