// import { baseColors } from "../../../../styles";
import { baseColors } from "../../../../styles";
import { getThemeConfiguration } from "../../../utilities";
import { base } from "./base";

export const zeroGRXDark = getThemeConfiguration({
  ...base,
  colors: {
    primary: {
      main: baseColors.darkpastelpurple023,
      on: baseColors.earlydawn004,
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
  palette: {
    mode: 'dark',
  },
});
