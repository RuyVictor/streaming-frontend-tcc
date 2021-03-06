import { FC } from "react";

import { AuthProvider } from "./auth.hook";
import { StreamProvider } from "./stream.hook";
import { AppThemeProvider } from "./theme.hook";

export const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <StreamProvider>
      <AppThemeProvider>{children}</AppThemeProvider>
    </StreamProvider>
  </AuthProvider>
);
