import { DrawerProps } from "@mui/material";

export type NavigationDrawerDevice = 'mobile' | 'tablet' | 'monitor';
export type NavigationDrawerVariant = DrawerProps["variant"];

export type NavigationDrawerState = {
  // This is what will be put through the navigation drawer components.
  props: {
    open: boolean;
    showItemText: boolean;
    variant: NavigationDrawerVariant;
  };
  appBarHeight: number;

  // This is just a 1:1 memory of the current state.
  device: NavigationDrawerDevice;
  state: boolean;
};

export type NavigationDrawerBaseActions = {
  appBarHeight: number;
  isMonitor: boolean;
  isTablet: boolean;
  isOpen: boolean;
};
export type NavigationDrawerSetProps = Partial<NavigationDrawerBaseActions>;
export type NavigationDrawerActions = {
  set: (props: NavigationDrawerSetProps) => void;
};
