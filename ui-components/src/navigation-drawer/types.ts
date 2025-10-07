import { ReactNode } from "react";
import { DrawerProps } from "@mui/material";

export type NavigationDrawerDevice = 'mobile' | 'tablet' | 'monitor';
export type NavigationDrawerVariant = DrawerProps["variant"];

export type NavigationDrawerAppBarHTMLElement = HTMLDivElement;
export type NavigationDrawerAppBarRef = NavigationDrawerAppBarHTMLElement | null;
export type NavigationDrawerAppBarRefObject = React.RefObject<NavigationDrawerAppBarRef> | null;

export type NavigationDrawerState = {
  // This is what will be put through the navigation drawer components.
  props: {
    open: boolean;
    showItemText: boolean;
    variant: NavigationDrawerVariant;
    backdrop: boolean;
  };
  appBarHeight: number;
  appBarRef: NavigationDrawerAppBarRefObject;

  // This is just a 1:1 memory of the current state.
  device: NavigationDrawerDevice;
  state: boolean;
  items: NavigationDrawerItem[];

  // This is for the page container margin.
  containerLeftMargin: number;
};

export type NavigationDrawerSetProps = {
  isMonitor?: boolean;
  isTablet?: boolean;
  isOpen?: boolean;
};
type StateSetters<T extends {
  [K: string]: keyof NavigationDrawerState;
}> = {
  [K in keyof T]: (value: NavigationDrawerState[T[K]]) => void;
};
export type NavigationDrawerActions = StateSetters<{
  setAppBarHeight: 'appBarHeight';
  setAppBarRef: 'appBarRef';
  setItems: 'items';
  setState: 'state';
}> & {
  setDevice: (isMonitor: boolean, isTablet: boolean) => void;
};

export type NavigationDrawerItem = {
  icon: ReactNode;
  text: string;
  onClick: React.MouseEventHandler;
};

export type NavigationDrawerProps = {
  items: NavigationDrawerItem[];
};
