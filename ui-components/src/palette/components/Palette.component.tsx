import { useAppTheme } from '../../theme';
import { useMemo } from 'react';
import { ColorDetails, ColorGrid, ColorItem, ColorName, ColorSwatch, ColorValue } from './Palette.style';
import { getColours } from '../utilities';

export const ColorPalette = () => {
  const { theme } = useAppTheme();
  const colors = useMemo(() => getColours(theme), [theme]);

  return (
    <>
      <ColorGrid>
        {colors.system.map(({ color, label }) => (
          <ColorItem key={label}>
            <ColorSwatch color={color} />
            <ColorDetails>
              <ColorName>{label}</ColorName>
              <ColorValue>{color}</ColorValue>
            </ColorDetails>
          </ColorItem>
        ))}
      </ColorGrid>
      <ColorGrid>
        {colors.message.map(({ color, label }) => (
          <ColorItem key={label}>
            <ColorSwatch color={color} />
            <ColorDetails>
              <ColorName>{label}</ColorName>
              <ColorValue>{color}</ColorValue>
            </ColorDetails>
          </ColorItem>
        ))}
      </ColorGrid>
      <ColorGrid>
        {colors.grey.map(({ color, label }) => (
          <ColorItem key={label}>
            <ColorSwatch color={color} />
            <ColorDetails>
              <ColorName>{label}</ColorName>
              <ColorValue>{color}</ColorValue>
            </ColorDetails>
          </ColorItem>
        ))}
      </ColorGrid>
    </>
  );
};
