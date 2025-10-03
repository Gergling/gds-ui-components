import { create } from "zustand";
import { NavigationDrawerActions, NavigationDrawerState } from "./types";
import { reduceNavigationDrawerState } from "./state/drawer";

export const navigationDrawerStore = create<
  NavigationDrawerState & NavigationDrawerActions
>((set, get) => ({
  appBarHeight: 0,
  props: {
    open: false,
    showItemText: false,
    variant: "temporary",
  },
  device: 'mobile',
  state: false,
  setAppBarHeight: (appBarHeight) => set({ appBarHeight }),
  setDevice: (isMonitor, isTablet) => {
    set(reduceNavigationDrawerState(get(), { isMonitor, isTablet }));
  },
  setState: (isOpen) => {
    set(reduceNavigationDrawerState(get(), { isOpen }));
  },
}));
