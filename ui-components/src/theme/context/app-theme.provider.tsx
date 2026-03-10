import { ReactNode, useEffect, useRef } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { AppThemeStoreContext } from "./app-theme.context";
import { ThemeProvider as EmotionThemeProvider, Global } from "@emotion/react";
import { useAppThemeProvider } from "./use-app-theme-provider";
import { AppThemeStateOverride } from "../types";

type ThemeProviderProps = AppThemeStateOverride & {
  children: ReactNode;
}

export const AppThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const {
    globalStyles,
    initialise,
    providerValue,
    theme,
  } = useAppThemeProvider();
  const initialisedRef = useRef(false);

  useEffect(() => {
    if (!initialisedRef.current && props) {
      initialise(props);
      initialisedRef.current = true;
    }
  }, [initialise, props]);

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
