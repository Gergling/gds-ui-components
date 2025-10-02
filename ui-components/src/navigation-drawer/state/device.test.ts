import { describe, it, expect } from 'vitest';
import { getNavigationDrawerDevice } from './device';

describe('getNavigationDrawerDevice', () => {
  it('should return "monitor" when isMonitor is true', () => {
    const result = getNavigationDrawerDevice('mobile', true, false);
    expect(result).toBe('monitor');
  });

  it('should return "tablet" when isTablet is true', () => {
    const result = getNavigationDrawerDevice('mobile', false, true);
    expect(result).toBe('tablet');
  });

  it('should return currentDevice when both isMonitor and isTablet are undefined', () => {
    const result = getNavigationDrawerDevice('mobile', undefined, undefined);
    expect(result).toBe('mobile');

    const result2 = getNavigationDrawerDevice('monitor', undefined, undefined);
    expect(result2).toBe('monitor');
  });

  it('should return "mobile" when both isMonitor and isTablet are false', () => {
    const result = getNavigationDrawerDevice('tablet', false, false);
    expect(result).toBe('mobile');
  });

  it('should prioritize "monitor" over "tablet" when both are true', () => {
      const result = getNavigationDrawerDevice('mobile', true, true);
      expect(result).toBe('monitor');
  });

  it('should handle different initial devices correctly', () => {
    expect(getNavigationDrawerDevice('tablet', true, false)).toBe('monitor');
    expect(getNavigationDrawerDevice('monitor', false, true)).toBe('tablet');
    expect(getNavigationDrawerDevice('mobile', false, undefined)).toBe('mobile');
    expect(getNavigationDrawerDevice('tablet', undefined, false)).toBe('mobile');
  });

  it('should return "mobile" when isMonitor is undefined and isTablet is false', () => {
    const result = getNavigationDrawerDevice('tablet', undefined, false);
    expect(result).toBe('mobile');
  });
});