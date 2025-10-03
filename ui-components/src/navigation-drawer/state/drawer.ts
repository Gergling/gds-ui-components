import { NAVIGATION_DRAWER_ICON_WIDTH, NAVIGATION_DRAWER_TEXT_MARGIN, NAVIGATION_DRAWER_TEXT_WIDTH } from "../constants";
import {
  NavigationDrawerSetProps,
  NavigationDrawerState,
  NavigationDrawerVariant
} from "../types";
import { getNavigationDrawerDevice } from "./device";

// Mobile: Invisible/Overlay
// Tablet: Rail/Overlay
// Monitor: Rail/Permanent

// Invisible: open={false}
// Rail: open={true}, non-icon list items have width 0, variant="temporary"
// Overlay: open={true}, non-icon list items have chosen width, variant="temporary"
// Permanent: open={true}, non-icon list items have chosen width, variant="permanent"

const RAIL_WIDTH = NAVIGATION_DRAWER_ICON_WIDTH + (NAVIGATION_DRAWER_TEXT_MARGIN * 2);

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

  // Permanent always shows the drawer, and temporary only shows it when open and provides an overlay.
  const variant: NavigationDrawerVariant = (device === 'tablet' && !state)
    || device === 'monitor' ? 'permanent' : 'temporary';

  // This is to explicitly switch out of rail mode, so when it's cleared we would just have the icon width.
  const showItemText = !!state;

  // This makes the temporary variant visible.
  const open = state || isNotMobile;

  // This is for adding to the left side of the page container.
  const isRailWidthAdded = isNotMobile;
  const isTextWidthAdded = showItemText && variant === 'permanent';
  const railWidth = isRailWidthAdded ? RAIL_WIDTH : 0;
  const textWidth = isTextWidthAdded ? NAVIGATION_DRAWER_TEXT_WIDTH : 0;
  const containerLeftMargin = railWidth + textWidth;

  return {
    containerLeftMargin,
    device,
    props: { open, showItemText, variant },
    state,
  };
};
