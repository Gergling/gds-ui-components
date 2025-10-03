import { create } from "zustand";
import { NavigationDrawerActions, NavigationDrawerState } from "./types";
import { reduceNavigationDrawerState } from "./state/drawer";

export const navigationDrawerStore = create<
  NavigationDrawerState & NavigationDrawerActions
>((set, get) => ({
  appBarHeight: 0,
  containerLeftMargin: 0,
  device: 'mobile',
  props: {
    open: false,
    showItemText: false,
    variant: "temporary",
  },
  state: false,
  setAppBarHeight: (appBarHeight) => set({ appBarHeight }),
  setDevice: (isMonitor, isTablet) => {
    set(reduceNavigationDrawerState(get(), { isMonitor, isTablet }));
  },
  setState: (isOpen) => {
    set(reduceNavigationDrawerState(get(), { isOpen }));
  },
}));
