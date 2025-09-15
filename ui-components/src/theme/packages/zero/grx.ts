import { baseColors } from "../../../styles"; 
import { getThemeConfiguration } from "../../utilities";
// Supports weights 400-900
import '@fontsource-variable/bodoni-moda-sc';
// Supports weights 100-900
import '@fontsource-variable/raleway';
// TODO: Test that italics work when tagged.
import '@fontsource-variable/raleway/wght-italic.css';

export const zeroGRX = getThemeConfiguration({
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
  typography: {
    h1: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h2: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h3: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h4: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h5: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h6: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    body1: {
      fontFamily: 'Raleway Variable'
    },
    body2: {
      fontFamily: 'Raleway Variable'
    },
  }
});
