import { createTheme } from "@mui/material";
import { baseColors } from "../../";

export const zeroGRX = createTheme({
  palette: {
    primary: {
      main: baseColors.daisybush006,
      on: baseColors.earlydawn094,
      container: {
        main: '',
        on: '',
      }
    }
  }
});
