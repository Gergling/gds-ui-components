// import { baseColors } from "../../../../styles";
import { getThemeConfiguration } from "../../../utilities";
import { base } from "./base";

export const zeroGRXDark = getThemeConfiguration({
  ...base,
  palette: {
    mode: 'dark',
  },
});
