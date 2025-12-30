import { useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { useColorScheme } from "@mui/material";
import { appThemeStore } from "../utilities";

export const useAppThemeProvider = () => {
  const providerValue = appThemeStore();
  const { setTheme, theme } = providerValue;
  const { mode, systemMode } = useColorScheme();

  const globalStyles = useMemo(() => css`
    @font-face {
      font-family: 'Bodoni Moda SC';
      src: url('/fonts/bodoni-moda-sc.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Raleway';
      src: url('/fonts/raleway-latin-wght-normal.woff2') format('woff2');
      src: url('/fonts/raleway/wght-italic.css') format('css');
    }
    body {
      font-family: '${theme.typography.body1.fontFamily}', 'Roboto', sans-serif;
      background-color: ${theme.palette.background.default};
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }`,
    [theme]
  );

  useEffect(() => {
    const depecheMode = mode === 'system' ? systemMode : mode;
    setTheme({ mode: depecheMode });
  }, [mode, setTheme, systemMode]);

  return {
    globalStyles,
    providerValue,
    theme,
  };
};
