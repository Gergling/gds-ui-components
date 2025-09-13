import { useAppTheme } from '../../theme';
import { useMemo } from 'react';
import { ColorDetails, ColorName, ColorSwatch, ColorValue, StyledColorItem } from './Palette.style';
import { getColours } from '../utilities';
import { Grid } from '@mui/material';
import { DisplayColor } from '../types';

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
  <Grid container spacing={2}>
    {colors.map(({ color, label }) => (
      <ColorItem color={color} label={label} key={label} />
    ))}
  </Grid>
);

export const ColorPalette = () => {
  const { theme } = useAppTheme();
  const colors = useMemo(() => getColours(theme), [theme]);

  return (
    <>
      <ColorGrid colors={colors.system} />
      <ColorGrid colors={colors.message} />
      <ColorGrid colors={colors.grey} />
    </>
  );
};
