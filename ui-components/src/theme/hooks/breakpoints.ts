import { useMediaQuery } from "@mui/material";
import { useAppTheme } from "..";

export const useBreakpoints = () => {
  const {
    theme: {
      breakpoints,
    },
  } = useAppTheme();
  const isTablet = useMediaQuery(breakpoints.up('md'));
  const isMonitor = useMediaQuery(breakpoints.up('lg'));

  return { isMonitor, isTablet };
};
