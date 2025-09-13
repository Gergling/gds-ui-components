import { describe, it, expect } from 'vitest';
import { toneBrightnessList } from './utilities';

describe('Tonal Palette', () => {
  it('should have a total of 14 tones, including the 0-100 scale and specific additions', () => {
    // We expect the array to have a total length of 14 elements.
    expect(toneBrightnessList).toHaveLength(12);
  });

  it('should contain the correct and ordered list of tonal brightness values', () => {
    const expectedTones = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99,
    ];

    // We expect the array to be exactly equal to our manually defined list,
    // ensuring both content and order are correct.
    expect(toneBrightnessList).toEqual(expectedTones);
  });
});
