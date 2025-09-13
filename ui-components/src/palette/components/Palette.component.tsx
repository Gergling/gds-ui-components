import { useAppTheme } from '../../theme';
import { useMemo } from 'react';
import { ColorDetails, ColorName, ColorSwatch, ColorValue, StyledColorGrid, StyledColorItem } from './Palette.style';
import { getColours } from '../utilities';
import { Divider } from '@mui/material';
import { DisplayColor } from '../types';
import { HueTones } from './Tones.component';

const ColorItem = ({ color, label }: DisplayColor) => (
  <StyledColorItem size={3}>
    <ColorSwatch color={color} />
    <ColorDetails>
      <ColorName>{label}</ColorName>
      <ColorValue>{color}</ColorValue>
    </ColorDetails>
  </StyledColorItem>
);
const ColorGrid = ({ colors }: { colors: DisplayColor[] }) => (
  <StyledColorGrid container spacing={2}>
    {colors.map(({ color, label }) => (
      <ColorItem color={color} label={label} key={label} />
    ))}
  </StyledColorGrid>
);

export const ColorPalette = () => {
  const { theme } = useAppTheme();
  const colors = useMemo(() => getColours(theme), [theme]);

  return (
    <>
      <HueTones />
      <Divider />
      <ColorGrid colors={colors.system} />
      <ColorGrid colors={colors.message} />
      <ColorGrid colors={colors.grey} />
    </>
  );
};
