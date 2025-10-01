import { beforeEach, describe, expect, it } from 'vitest';
import { navigationDrawerStore } from './stores';
import { act } from '@testing-library/react';
import { NavigationDrawerDevice } from './types';

const initialState = navigationDrawerStore.getState();

describe('navigationDrawerStore', () => {
  beforeEach(() => {
    // Reset the store to its initial state before each test
    navigationDrawerStore.setState(initialState, true);
  });

  it('should have the correct initial state', () => {
    const { props, device, state } = navigationDrawerStore.getState();
    expect(props).toEqual({
      open: false,
      showItemText: false,
      variant: 'temporary',
    });
    expect(device).toBe('mobile');
    expect(state).toBe(false);
  });

  describe('set action', () => {
    // Test cases for different device and isOpen combinations
    const testCases = [
      // Mobile
      { device: 'mobile', isOpen: false, expected: { open: false, showItemText: false, variant: 'temporary' } },
      { device: 'mobile', isOpen: true, expected: { open: true, showItemText: true, variant: 'temporary' } },
      // Tablet
      { device: 'tablet', isOpen: false, expected: { open: true, showItemText: false, variant: 'temporary' } },
      { device: 'tablet', isOpen: true, expected: { open: true, showItemText: true, variant: 'temporary' } },
      // Monitor
      { device: 'monitor', isOpen: false, expected: { open: true, showItemText: false, variant: 'temporary' } },
      { device: 'monitor', isOpen: true, expected: { open: true, showItemText: true, variant: 'permanent' } },
    ];

    testCases.forEach(({ device, isOpen, expected }) => {
      it(`should correctly update props for device='${device}' and isOpen=${isOpen}`, () => {
        const { set } = navigationDrawerStore.getState();
        act(() => {
          set({ device: device as NavigationDrawerDevice, isOpen });
        });
 
        const state = navigationDrawerStore.getState();
        const { props } = state;
        expect(props).toEqual(expected);
        expect(state.device).toBe(device);
        expect(state.state).toBe(isOpen);
      });
    });
    it('should use current state if arguments are not provided', () => {
      const { set } = navigationDrawerStore.getState();

      // 1. Set initial device and open state
      act(() => {
        set({ device: 'monitor', isOpen: true });
      });
      expect(navigationDrawerStore.getState().props).toEqual({
        open: true,
        showItemText: true,
        variant: 'permanent',
      });

      // 2. Call set with only isOpen, should use 'monitor' device from previous state
      act(() => {
        set({ isOpen: false });
      });
      expect(navigationDrawerStore.getState().props).toEqual({
        open: true,
        showItemText: false,
        variant: 'temporary',
      });
      expect(navigationDrawerStore.getState().device).toBe('monitor');
      expect(navigationDrawerStore.getState().state).toBe(false);

      // 3. Call set with only device, should use 'false' isOpen from previous state
      act(() => {
        set({ device: 'mobile' });
      });
      expect(navigationDrawerStore.getState().props).toEqual({
        open: false,
        showItemText: false,
        variant: 'temporary',
      });
      expect(navigationDrawerStore.getState().device).toBe('mobile');
      expect(navigationDrawerStore.getState().state).toBe(false);
    });

    it('should update the top-level device and state properties', () => {
      const { set } = navigationDrawerStore.getState();

      act(() => {
        set({ device: 'monitor', isOpen: true });
      });

      const { device, state } = navigationDrawerStore.getState();
      expect(device).toBe('monitor');
      expect(state).toBe(true);
    });
  });
});