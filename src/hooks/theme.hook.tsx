import {
  FC,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import { ThemeProvider } from "styled-components";

import * as themes from "../styles/themes";

type ThemeState = "dark";

const ThemeStoragePrefix = "@viitra-challenge-web:theme";

interface AppThemeContext {
  currentTheme: ThemeState;
  toggleTheme(): void;
}

const AppThemeContext = createContext({} as AppThemeContext);

export const AppThemeProvider: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeState>(() => {
    const storedTheme = localStorage.getItem(ThemeStoragePrefix) as ThemeState;

    return storedTheme ? JSON.parse(storedTheme) : "dark";
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prevTheme) => {
      const newTheme = "dark";
      localStorage.setItem(ThemeStoragePrefix, JSON.stringify(newTheme));

      return newTheme;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentTheme,
      toggleTheme,
    }),
    [currentTheme, toggleTheme]
  );

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(AppThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within an AppThemeProvider");
  }

  return themeContext;
};
