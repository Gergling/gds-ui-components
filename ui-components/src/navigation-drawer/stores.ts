import { create } from "zustand";
import { NavigationDrawerActions, NavigationDrawerState } from "./types";
import { reduceNavigationDrawerState } from "./state/drawer";

const initialState: NavigationDrawerState = {
  appBarHeight: 0,
  appBarRef: null,
  containerLeftMargin: 0,
  device: 'mobile',
  items: [],
  props: {
    backdrop: false,
    open: false,
    showItemText: false,
    variant: "temporary",
  },
  state: false,
};

export const navigationDrawerStore = create<
  NavigationDrawerState & NavigationDrawerActions
>()((set, get) => {
  const actions: NavigationDrawerActions = {
    setAppBarHeight: (appBarHeight) => set({ appBarHeight }),
    setAppBarRef: (ref) => set({ appBarRef: ref }),
    setDevice: (isMonitor, isTablet) => {
      set(reduceNavigationDrawerState(get(), { isMonitor, isTablet }));
    },
    setItems: (items) => set({ items }),
    setState: (isOpen) => {
      set(reduceNavigationDrawerState(get(), { isOpen }));
    },
  };

  return { ...initialState, ...actions };
});
