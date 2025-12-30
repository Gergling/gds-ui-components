import { baseColors } from "../../../../styles";
import { getThemeConfiguration } from "../../../utilities";

export const zeroGDSDark = getThemeConfiguration({
  palette: {
    background: {
      default: '#130000', // Diesel
    },
    mode: 'dark',
  },
  colors: {
    primary: {
      main: baseColors.crimsonred,
      on: baseColors.ecru,
      container: {
        main: 'rgb(105, 0, 0)',
        on: 'rgb(255, 180, 168)',
      }
    },
    secondary: {
      main: baseColors.yellowmetal,
      on: 'rgb(255, 224, 129)',
      container: {
        main: 'rgb(60, 47, 0)',
        on: 'rgb(231, 195, 73)',
      },
    },
    tertiary: {
      main: '#222',
      on: '#eee',
      container: {
        main: '#444',
        on: '#ddd',
      }
    },
  }
});
