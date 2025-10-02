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

export const reduceNavigationDrawerState = (
  currentState: NavigationDrawerState,
  {
    isMonitor,
    isTablet,
    isOpen,
  }: NavigationDrawerSetProps
): Partial<NavigationDrawerState> => {
  const device = getNavigationDrawerDevice(currentState.device, isMonitor, isTablet);
  const state = isOpen ?? currentState.state;

  // Permanent always shows the drawer, and temporary only shows it when open and provides an overlay.
  const variant: NavigationDrawerVariant = (device === 'tablet' && !state)
    || device === 'monitor' ? 'permanent' : 'temporary';

  // This is to explicitly switch out of rail mode, so when it's cleared we would just have the icon width.
  const showItemText = !!state;

  // This makes the temporary variant visible.
  const open = state || device !== 'mobile';

  return {
    device,
    state,
    props: { open, showItemText, variant },
  };
};
