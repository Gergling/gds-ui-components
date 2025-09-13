import { ReactNode, useEffect } from "react";
import { ThemeProvider, useColorScheme } from "@mui/material";
import { appThemeStore } from "../utilities";
import { AppThemeStoreContext } from "./app-theme.context";

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const value = appThemeStore();
  const { setTheme, theme } = value;
  const { mode, systemMode } = useColorScheme();

  useEffect(() => {
    if (mode === 'system') {
      setTheme({ mode: systemMode });
    } else if (mode !== undefined) {
      setTheme({ mode });
    }
  }, [mode, setTheme, systemMode]);

  return (
    <AppThemeStoreContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppThemeStoreContext.Provider>
  );
};
