import { ReactNode } from "react";
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

  // This is for the page container margin.
  containerLeftMargin: number;
};

type NavigationDrawerBaseActions = {
  appBarHeight: number;
  isMonitor: boolean;
  isTablet: boolean;
  isOpen: boolean;
};
export type NavigationDrawerSetProps = Partial<NavigationDrawerBaseActions>;
export type NavigationDrawerActions = {
  setAppBarHeight: (appBarHeight: number) => void;
  setDevice: (isMonitor: boolean, isTablet: boolean) => void;
  setState: (isOpen: boolean) => void;
};

export type NavigationDrawerItem = {
  icon: ReactNode;
  text: string;
  onClick: React.MouseEventHandler;
};
