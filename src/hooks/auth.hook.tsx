import React, { createContext, useContext, useEffect, useState } from "react";
import { IMember } from "../models/Member";
import { ISignInDTO } from "../models/Auth";
import api from "../services/api";
import { AuthService } from "../services";

enum StoragePrefix {
    member = "@viitra-challenge-web:member",
    token = "@viitra-challenge-web:token",
    tokenExp = "@viitra-challenge-web:token-exp",
}

type AuthContextData = {
    readonly user: IMember | undefined;
    signIn: (data: ISignInDTO) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userFromStorage = localStorage.getItem(StoragePrefix.member);
    const token = localStorage.getItem(StoragePrefix.token);

    if (token && userFromStorage) {
      const user: IMember = JSON.parse(userFromStorage);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return user;
    }
    return undefined;
  });

  async function signIn({
    email,
    password,
  }: ISignInDTO) {
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
        signIn,
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
