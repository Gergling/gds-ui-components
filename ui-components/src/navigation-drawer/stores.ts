import { create } from "zustand";
import { NavigationDrawerDevice, NavigationDrawerVariant } from "./types";

// Mobile: Invisible/Overlay
// Tablet: Rail/Overlay
// Monitor: Rail/Permanent

// Invisible: open={false}
// Rail: open={true}, non-icon list items have width 0, variant="temporary"
// Overlay: open={true}, non-icon list items have chosen width, variant="temporary"
// Permanent: open={true}, non-icon list items have chosen width, variant="permanent"

type SetProps = Partial<{ device: NavigationDrawerDevice; isOpen: boolean; }>;

export const navigationDrawerStore = create<{
  // This is what will be put through the navigation drawer components.
  props: {
    open: boolean;
    showItemText: boolean;
    variant: NavigationDrawerVariant;
  };

  // This is just a 1:1 memory of the current state.
  device: NavigationDrawerDevice;
  state: boolean;

  // This is the action.
  set: (props: SetProps) => void;
}>((set, get) => ({
  props: {
    open: false,
    showItemText: false,
    variant: "temporary",
  },
  device: 'mobile',
  state: false,
  set: ({ device: newDevice, isOpen: newIsOpen }) => {
    const { device: currentDevice, state: currentState } = get();
    const device = newDevice ?? currentDevice;
    const isOpen = newIsOpen ?? currentState;
    const variant: NavigationDrawerVariant = device === 'monitor' && isOpen ? 'permanent' : 'temporary';
    const showItemText = !!isOpen;
    const open = isOpen || device !== 'mobile';
    set({ device, state: isOpen, props: { open, showItemText, variant } });
  },
}));
