import { FC } from "react";

import { AuthProvider } from "./auth.hook";
import { CategoryProvider } from "./category.hook";
import { StreamProvider } from "./stream.hook";
import { AppThemeProvider } from "./theme.hook";

export const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <StreamProvider>
      <CategoryProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </CategoryProvider>
    </StreamProvider>
  </AuthProvider>
);
