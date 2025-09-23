/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import '@mui/material/styles';
import '@emotion/react';
import { DeepPartial, ThemeExtension } from './types';

declare module '@mui/material/styles' {
  export interface Theme extends ThemeExtension {}
  export interface ThemeOptions extends DeepPartial<ThemeExtension> {}
}

declare module '@emotion/react' {
  import { Theme as MuiTheme } from '@mui/material/styles';
  export interface Theme extends MuiTheme, ThemeExtension {}
}
