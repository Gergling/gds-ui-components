import { NavigationDrawerDevice, NavigationDrawerSetProps, NavigationDrawerState, NavigationDrawerVariant } from "./types";

const getDevice = (
  currentDevice: NavigationDrawerDevice,
  isMonitor: boolean | undefined,
  isTablet: boolean | undefined,
): NavigationDrawerDevice => {
  if (isMonitor) return 'monitor';
  if (isTablet) return 'tablet';
  if (isMonitor === undefined && isTablet === undefined) return currentDevice;
  return 'mobile';
}

export const reduceNavigationDrawerState = (
  currentState: NavigationDrawerState,
  {
    isMonitor,
    isTablet,
    isOpen,
  }: NavigationDrawerSetProps
): Partial<NavigationDrawerState> => {
  const device = getDevice(currentState.device, isMonitor, isTablet);
  const state = isOpen ?? currentState.state;
  const variant: NavigationDrawerVariant = device === 'monitor' && state ? 'permanent' : 'temporary';
  const showItemText = !!state;
  const open = state || device !== 'mobile';

  return {
    device,
    state,
    props: { open, showItemText, variant },
  };
};
