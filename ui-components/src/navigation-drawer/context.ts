import { useEffect } from "react";
import { contextFactory } from "../common/context";
import { useBreakpoints } from "../theme";
import { navigationDrawerStore } from "./stores";
import {
  NavigationDrawerActions,
  NavigationDrawerItem,
} from "./types";

const useNavigationDrawerDevice = (setDevice: NavigationDrawerActions['setDevice']) => {
  const {
    isMonitor,
    isTablet,
  } = useBreakpoints();

  useEffect(() => {
    setDevice(isMonitor, isTablet);
  }, [isMonitor, isTablet, setDevice]);
};

const {
  Context: NavigationDrawerContext,
  Provider: NavigationDrawerProvider,
  useContextHook,
} = contextFactory(
  ({ items }: { items?: NavigationDrawerItem[] }) => {
    const store = navigationDrawerStore();
    const {
      setDevice,
      setItems
    } = store;

    useEffect(() => {
      setItems(items ?? []);
    }, [items, setItems]);
    useNavigationDrawerDevice(setDevice);

    return store;
  },
  'navigationDrawer'
);

const useNavigationDrawer = () => {
  const {
    appBarHeight,
    appBarRef,
    containerLeftMargin,
    device,
    items,
    props,
    setAppBarHeight,
    setAppBarRef,
    setState,
    state,
  } = useContextHook();

  return {
    appHeaderHeight: appBarHeight,
    appHeaderRef: appBarRef,
    containerLeftMargin,
    device,
    items,
    props,
    setAppBarHeight,
    setAppBarRef,
    setState,
    state,
  };
};

export {
  NavigationDrawerContext,
  NavigationDrawerProvider,
  useNavigationDrawer,
};
