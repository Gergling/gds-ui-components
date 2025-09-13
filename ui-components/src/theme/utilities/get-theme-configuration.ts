import { createTheme, Theme } from "@mui/material";
import { DeepPartial, SemanticColorGroup, SemanticColors, ThemeExtension } from "../types";
import { SEMANTIC_NAMES_MESSAGE, SEMANTIC_NAMES_SYSTEM } from "../constants";

type WrapperArgs = Parameters<typeof createTheme>[0] & DeepPartial<ThemeExtension>;

const WARNING_PINK = '#ffaacc';
const BASE_PALETTE = {
  contrastText: WARNING_PINK,
  dark: WARNING_PINK,
  light: WARNING_PINK,
};

const getSemanticColorConfiguration = (
  base: SemanticColors,
  extension: DeepPartial<SemanticColors>
): SemanticColors => Object.entries(base).reduce((
  colors,
  [
    semanticName,
    baseColor
  ]
) => {
  const extensionColor = extension[semanticName as SemanticColorGroup];
  return {
    ...colors,
    [semanticName]: {
      ...baseColor,
      ...extensionColor,
    }
  };
}, {} as SemanticColors);

export const getThemeConfiguration = (
  options: WrapperArgs
): Theme => {
  const initialPalette = createTheme().palette;
  const colors = {
    ...[...SEMANTIC_NAMES_MESSAGE, ...SEMANTIC_NAMES_SYSTEM].reduce(
      (
        colors,
        semanticName
      ) => {
        const { contrastText, main } = semanticName === 'tertiary'
          ? { contrastText: 'black', main: 'white' }
          : initialPalette[semanticName];
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
    colors: getSemanticColorConfiguration(
      colors,
      options.colors || {},
    ),
    palette,
  });
};
