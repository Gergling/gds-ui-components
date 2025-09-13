import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { baseColors } from "../../../styles"; 
import { SemanticColors, ThemeExtension } from "../../types";
import { SEMANTIC_NAMES_MESSAGE } from "../../constants";

// This is to make sure it's obvious when something in the theme is
// using the wrong colour.
const WARNING_PINK = '#ffaacc';
const BASE_PALETTE = {
  contrastText: WARNING_PINK,
  dark: WARNING_PINK,
  light: WARNING_PINK,
};

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type WrapperArgs = Parameters<typeof createTheme>[0] & DeepPartial<ThemeExtension>;

const createThemeWrapper = (
  options: WrapperArgs
): Theme => {
  const initialPalette = createTheme().palette;
  const colors = {
    ...SEMANTIC_NAMES_MESSAGE.reduce(
      (
        colors,
        semanticName
      ) => {
        const { contrastText, main } = initialPalette[semanticName];
        return {
          ...colors,
          [semanticName]: { main, on: contrastText, container: {
            main: WARNING_PINK,
            on: WARNING_PINK,
          } },
        };
      },
      {} as SemanticColors
    )
  };
  const palette = options.colors ? Object.entries(options.colors).reduce(
    (
      theme,
      [semanticName, { main, on }]
    ) => {
      return {
        ...theme,
        [semanticName]: { ...BASE_PALETTE, main, contrastText: on },
      };
    },
    initialPalette
  ) : {};

  return createTheme({
    ...options,
    colors: {
      ...colors,
      ...options.colors,
    },
    palette,
  });
};

export const zeroGRX = createThemeWrapper({
  colors: {
    primary: {
      main: baseColors.daisybush006,
      on: baseColors.earlydawn094,
      container: {
        main: '',
        on: '',
      }
    },
    secondary: {
      main: baseColors.yellowmetal012,
      on: baseColors.earlydawn094,
      container: {
        main: '',
        on: '',
      }
    },
    tertiary: {
      main: baseColors.daisybush006,
      on: baseColors.earlydawn094,
      container: {
        main: '',
        on: '',
      }
    },
  },
});
