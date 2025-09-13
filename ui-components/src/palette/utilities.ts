import { Theme } from "@mui/material/styles";
import { DisplayColor } from "./types";
import { capitaliseFirstLetter } from "../common/utilities";
import { SEMANTIC_NAMES_MESSAGE, SEMANTIC_NAMES_SYSTEM } from "../theme";

export const toneBrightnessList = [
  ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 10),
  95, 98, 99
];

const segments = 6;
const size = 360 / segments;
export const toneHueList = Array.from({ length: segments }).map((_, i) => i * size);

const reduceColorsFactory = (
  theme: Theme
) => (
  colors: DisplayColor[],
  name: keyof Theme['colors'],
): DisplayColor[] => {
  const { main, on, container } = theme.colors[name];
  const capitalisedLabel = capitaliseFirstLetter(name);
  return [
    ...colors,
    {
      color: main,
      label: capitalisedLabel,
    },
    {
      color: on,
      label: `On ${capitalisedLabel}`,
    },
    {
      color: container.main,
      label: `${capitalisedLabel} Container`,
    },
    {
      color: container.on,
      label: `On ${capitalisedLabel} Container`,
    },
  ];
};

const getGroupDisplayColors = (
  theme: Theme,
  semanticNames: (keyof Theme['colors'])[],
) => semanticNames.reduce(
  reduceColorsFactory(theme),
  [] as DisplayColor[]
);

export const getColours = (theme: Theme): {
  message: DisplayColor[];
  system: DisplayColor[];
  grey: DisplayColor[];
} => ({
  message: getGroupDisplayColors(theme, [...SEMANTIC_NAMES_MESSAGE]),
  system: getGroupDisplayColors(theme, [...SEMANTIC_NAMES_SYSTEM]),
  grey: Object.entries(theme.palette.grey).map(([label, color]) => ({ color, label })),
});
