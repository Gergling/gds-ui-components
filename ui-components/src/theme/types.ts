import { Theme } from "@mui/material/styles";
import {
  DESIGN_SYSTEM_PROJECTS,
  DESIGN_SYSTEM_VERSIONS,
  SEMANTIC_NAMES_MESSAGE,
  SEMANTIC_NAMES_SYSTEM
} from "./constants";
import { DefaultColorScheme } from "@mui/material/styles/createThemeWithVars";

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

interface SemanticColor extends TonalContrast {
  container: TonalContrast;
}
export type SemanticColorGroup =
  | typeof SEMANTIC_NAMES_MESSAGE[number]
  | typeof SEMANTIC_NAMES_SYSTEM[number];

export type SemanticColors = {
  [K in SemanticColorGroup]: SemanticColor;
};

export interface ThemeExtension {
  colors: SemanticColors;
}

export type VersionThemeName = typeof DESIGN_SYSTEM_VERSIONS[number];
export type ProjectThemeName = typeof DESIGN_SYSTEM_PROJECTS[number];
export type ModeThemeName = DefaultColorScheme;

export type ModeThemes = {
  [mode in ModeThemeName]: Theme;
};

export type ProjectThemes = {
  [project in ProjectThemeName]: ModeThemes;
};

export type DesignSystemThemes = {
  [version in VersionThemeName]: ProjectThemes;
};

export type TonalContrast = {
  main: string;
  on: string;
};

type AppThemeState = {
  version: VersionThemeName;
  project: ProjectThemeName;
  mode: ModeThemeName;
};
export type SetThemeProps = Partial<AppThemeState>;

export type AppTheme = AppThemeState & {
  version: VersionThemeName;
  project: ProjectThemeName;
  mode: ModeThemeName;
  theme: Theme;
  setTheme: (props: SetThemeProps) => void;
};
