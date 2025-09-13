import { DefaultColorScheme } from "@mui/material/styles/createThemeWithVars";

export const DESIGN_SYSTEM_VERSIONS = ['zero'] as const;
export const DESIGN_SYSTEM_PROJECTS = ['gds', 'grx', 'wsu', 'pui'] as const;
export const DESIGN_SYSTEM_MODES: DefaultColorScheme[] = ['dark', 'light'] as const;

export const SEMANTIC_NAMES_MESSAGE = [
  'success',
  'info',
  'warning',
  'error',
] as const;
export const SEMANTIC_NAMES_SYSTEM = ['primary', 'secondary', 'tertiary'] as const;
