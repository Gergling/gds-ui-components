import { shallow } from 'zustand/shallow';
import { NAVIGATION_DRAWER_RAIL_WIDTH, NAVIGATION_DRAWER_TEXT_WIDTH } from "../constants";
import {
  NavigationDrawerSetProps,
  NavigationDrawerState,
  NavigationDrawerVariant
} from '../types';
import { getNavigationDrawerDevice } from "./device";

// Mobile: Invisible/Overlay
// Tablet: Rail/Overlay
// Monitor: Rail/Permanent

// Invisible: open={false}
// Rail: open={true}, non-icon list items have width 0, variant="temporary"
// Overlay: open={true}, non-icon list items have chosen width, variant="temporary"
// Permanent: open={true}, non-icon list items have chosen width, variant="permanent"

export const reduceNavigationDrawerState = (
  currentState: NavigationDrawerState,
  {
    isMonitor,
    isTablet,
    isOpen,
  }: NavigationDrawerSetProps
): Partial<NavigationDrawerState> => {
  const device = getNavigationDrawerDevice(currentState.device, isMonitor, isTablet);
  const isNotMobile = device !== 'mobile';
  const state = isOpen ?? currentState.state;

  // Permanent always shows the drawer, and temporary only shows it when open
  // and provides an overlay.
  // TODO: Junking?
  const variant: NavigationDrawerVariant = isNotMobile ? 'permanent' : 'temporary';

  // The drawer "open" state is deliberately abstracted because what
  // constitutes "open" in our usage differs from the Drawer component property.
  const open = state;

  // This is to explicitly switch out of rail mode, so when it's cleared we would just have the icon width.
  const showItemText = !!state;
  const showItemIcon = isNotMobile || state;

  // This is for including the backdrop when the drawer is open but the device is not monitor.
  const backdrop = state && device !== 'monitor';

  // This is for adding to the left side of the page container.
  const isRailWidthAdded = isNotMobile;
  const isTextWidthAdded = showItemText && device === 'monitor';
  const railWidth = isRailWidthAdded ? NAVIGATION_DRAWER_RAIL_WIDTH : 0;
  const textWidth = isTextWidthAdded ? NAVIGATION_DRAWER_TEXT_WIDTH : 0;
  // Should be just the rail for tablet.
  const containerLeftMargin = railWidth + textWidth;

  // These properties apply directly to a component in some way.
  const newProps = { backdrop, open, showItemIcon, showItemText, variant };

  return {
    containerLeftMargin,
    device,
    // Only update the props object if its contents have actually changed.
    // This prevents re-renders by creating a new object reference unnecessarily.
    props: shallow(currentState.props, newProps)
      ? currentState.props
      : newProps,
    state,
  };
};
