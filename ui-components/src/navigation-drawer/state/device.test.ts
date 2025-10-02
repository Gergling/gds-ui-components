import { describe, it, expect } from 'vitest';
import { getDevice } from './device';

describe('getDevice', () => {
  it('should return "monitor" when isMonitor is true', () => {
    const result = getDevice('mobile', true, false);
    expect(result).toBe('monitor');
  });

  it('should return "tablet" when isTablet is true', () => {
    const result = getDevice('mobile', false, true);
    expect(result).toBe('tablet');
  });

  it('should return currentDevice when both isMonitor and isTablet are undefined', () => {
    const result = getDevice('mobile', undefined, undefined);
    expect(result).toBe('mobile');

    const result2 = getDevice('monitor', undefined, undefined);
    expect(result2).toBe('monitor');
  });

  it('should return "mobile" when both isMonitor and isTablet are false', () => {
    const result = getDevice('tablet', false, false);
    expect(result).toBe('mobile');
  });

  it('should prioritize "monitor" over "tablet" when both are true', () => {
      const result = getDevice('mobile', true, true);
      expect(result).toBe('monitor');
  });

  it('should handle different initial devices correctly', () => {
    expect(getDevice('tablet', true, false)).toBe('monitor');
    expect(getDevice('monitor', false, true)).toBe('tablet');
    expect(getDevice('mobile', false, undefined)).toBe('mobile');
    expect(getDevice('tablet', undefined, false)).toBe('mobile');
  });

  it('should return "mobile" when isMonitor is undefined and isTablet is false', () => {
    const result = getDevice('tablet', undefined, false);
    expect(result).toBe('mobile');
  });
});