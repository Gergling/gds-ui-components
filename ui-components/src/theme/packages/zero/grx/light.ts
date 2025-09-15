import { baseColors } from "../../../../styles";
import { getThemeConfiguration } from "../../../utilities";
import { base } from "./base";

export const zeroGRXLight = getThemeConfiguration({
  ...base,
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
