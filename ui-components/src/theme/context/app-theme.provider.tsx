import { ReactNode } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { AppThemeStoreContext } from "./app-theme.context";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import { useAppThemeProvider } from "./use-app-theme-provider";

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const {
    globalStyles,
    providerValue,
    theme,
  } = useAppThemeProvider();

  return (
    <AppThemeStoreContext.Provider value={providerValue}>
      <MUIThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          {children}
        </EmotionThemeProvider>
      </MUIThemeProvider>
    </AppThemeStoreContext.Provider>
  );
};
