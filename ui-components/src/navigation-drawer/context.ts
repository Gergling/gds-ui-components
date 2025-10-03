import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { contextFactory } from "../common/context";
import { useAppTheme } from "../theme";
import { navigationDrawerStore } from "./stores";
import { useElementHeight } from "../common/use-element-height";

const {
  Context: NavigationDrawerContext,
  Provider: NavigationDrawerProvider,
  useContextHook,
} = contextFactory(() => navigationDrawerStore(), 'navigationDrawer');

const useNavigationDrawer = () => {
  const {
    appBarHeight,
    containerLeftMargin,
    props,
    setAppBarHeight,
    setDevice,
    setState,
    state,
  } = useContextHook();
  const {
    theme: {
      breakpoints,
    },
  } = useAppTheme();
  const isTablet = useMediaQuery(breakpoints.up('md'));
  const isMonitor = useMediaQuery(breakpoints.up('lg'));
  const [ref, height] = useElementHeight();

  useEffect(() => {
    setAppBarHeight(height);
  }, [height, setAppBarHeight]);

  useEffect(() => {
    setDevice(isMonitor, isTablet);
  }, [isMonitor, isTablet, setDevice]);

  return {
    appHeaderRef: ref,
    appHeaderHeight: appBarHeight,
    containerLeftMargin,
    props,
    setState,
    state,
  };
};

export {
  NavigationDrawerContext,
  NavigationDrawerProvider,
  useNavigationDrawer,
};
