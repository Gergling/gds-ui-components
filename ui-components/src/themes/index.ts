import { TonalContrast } from './types';

// TODO: Ideally move this elsewhere.
declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions extends TonalContrast {
    container: TonalContrast;
  }
  interface PaletteColor {
    primary?: SimplePaletteColorOptions;
    tertiary?: SimplePaletteColorOptions;
    quarternary?: SimplePaletteColorOptions;
  }
}

export * from './zero';
