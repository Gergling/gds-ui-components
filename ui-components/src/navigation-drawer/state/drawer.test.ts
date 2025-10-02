import { describe, it, expect } from 'vitest';
import { reduceNavigationDrawerState } from './drawer';
import { NavigationDrawerState } from '../types';

const initialMobileState: NavigationDrawerState = {
  appBarHeight: 0,
  device: 'mobile',
  state: false,
  props: {
    open: false,
    showItemText: false,
    variant: 'temporary',
  },
};

const initialMonitorState: NavigationDrawerState = {
  appBarHeight: 0,
  device: 'monitor',
  state: true,
  props: {
    open: true,
    showItemText: true,
    variant: 'permanent',
  },
};

describe('reduceNavigationDrawerState', () => {
  describe('Device and State Changes', () => {
    const testCases = [
      // Mobile
      { isMonitor: false, isTablet: false, isOpen: false, expected: { device: 'mobile', state: false, props: { open: false, showItemText: false, variant: 'temporary' } } },
      { isMonitor: false, isTablet: false, isOpen: true, expected: { device: 'mobile', state: true, props: { open: true, showItemText: true, variant: 'temporary' } } },
      // Tablet
      { isMonitor: false, isTablet: true, isOpen: false, expected: { device: 'tablet', state: false, props: { open: true, showItemText: false, variant: 'permanent' } } },
      { isMonitor: false, isTablet: true, isOpen: true, expected: { device: 'tablet', state: true, props: { open: true, showItemText: true, variant: 'temporary' } } },
      // Monitor
      { isMonitor: true, isTablet: false, isOpen: false, expected: { device: 'monitor', state: false, props: { open: true, showItemText: false, variant: 'permanent' } } },
      { isMonitor: true, isTablet: true, isOpen: true, expected: { device: 'monitor', state: true, props: { open: true, showItemText: true, variant: 'permanent' } } },
    ];

    testCases.forEach(({ isMonitor, isTablet, isOpen, expected }) => {
      it(`should return correct state for isMonitor=${isMonitor}, isTablet=${isTablet}, isOpen=${isOpen}`, () => {
        const result = reduceNavigationDrawerState(initialMobileState, { isMonitor, isTablet, isOpen });
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Partial Updates', () => {
    it('should only update isOpen and derive props, retaining the current device', () => {
      // Start with a monitor state
      const currentState: NavigationDrawerState = {
        ...initialMonitorState,
        device: 'monitor',
        state: true,
      };

      // Action is to close the drawer, without specifying device
      const result = reduceNavigationDrawerState(currentState, { isOpen: false });

      // Expect the device to remain 'monitor' and state to be updated
      expect(result).toEqual({
        device: 'monitor', // Retained from currentState
        state: false,     // Updated from props
        props: {
          open: true,
          showItemText: false,
          variant: 'permanent',
        },
      });
    });

    it('should only update device and derive props, retaining the current open state', () => {
      // Start with an open mobile state
      const currentState: NavigationDrawerState = {
        ...initialMobileState,
        device: 'mobile',
        state: true, // Drawer is open
      };

      // Action is to change device to monitor, without specifying isOpen
      const result = reduceNavigationDrawerState(currentState, { isMonitor: true });

      // Expect the state to remain 'true' and device to be updated
      expect(result).toEqual({
        device: 'monitor', // Updated from props
        state: true,       // Retained from currentState
        props: {
          open: true,
      showItemText: true,
          variant: 'permanent',
        },
      });
    });

    it('should use current state when no props are provided', () => {
      const result = reduceNavigationDrawerState(initialMonitorState, {});

      // Expect the state to be unchanged
      expect(result).toEqual({
        device: 'monitor',
        state: true,
        props: {
          open: true,
          showItemText: true,
          variant: 'permanent',
        },
      });
    });
  });
});