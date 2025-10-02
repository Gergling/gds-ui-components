import { NavigationDrawerDevice } from "../types";

// Functions as a kind of abstracted "reducer" for the device state.
// isMonitor and isTablet are fed based on a min-width media query check.
// If none of that is set, we stick to the current device.

export const getDevice = (
  currentDevice: NavigationDrawerDevice,
  isMonitor: boolean | undefined,
  isTablet: boolean | undefined,
): NavigationDrawerDevice => {
  if (isMonitor) return 'monitor';
  if (isTablet) return 'tablet';
  if (isMonitor === undefined && isTablet === undefined) return currentDevice;
  return 'mobile';
};
