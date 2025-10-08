const red = 0;
const green = 120;
const hueRange = green - red;

export const interpolateHue = (value, minimum, maximum) => {
  if (value <= minimum) return red;
  if (value >= maximum) return green;

  const range = maximum - minimum;
  const scaled = value / range;
  const hueScaled = scaled * hueRange;
  const hue = red + hueScaled;
  const rounded = Math.round(hue);
  return rounded;
};
