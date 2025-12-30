import { Colord, colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import { useTheme } from '../../theme';
import { PropsWithChildren, useMemo } from 'react';
import { ColorDetails, ColorName, ColorSwatch, ColorValue, StyledColorGrid, StyledColorItem, StyledSemantic } from './Palette.style';
import { getColours } from '../utilities';
import { Divider } from '@mui/material';
import { DisplayColor, DisplaySemanticColor } from '../types';
import { HueTones } from './Tones.component';
import { TonalContrast } from "../../theme/types";

extend([a11yPlugin]);

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

const getReadabilityEmoji = (
  main: Colord,
  on: Colord,
) => {
  const isAAA = main.isReadable(on, { level: "AAA", size: "normal" });
  if (isAAA) return '✅';

  const isAA = main.isReadable(on, { level: "AA", size: "normal" });
  if (isAA) return '⚠️';

  return '🚫';
};

const SemanticTone = ({
  children,
  tonalContrast: { main, on }
}: PropsWithChildren & { tonalContrast: TonalContrast; }) => {
  const colorMain = colord(main);
  const colorOn = colord(on);
  
  const contrast = colorMain.contrast(colorOn);
  const readabilityEmoji = getReadabilityEmoji(colorMain, colorOn);

  return (
    <StyledSemantic tonalContrast={{ main, on }}>
      {children}
      ({contrast}: {readabilityEmoji})
    </StyledSemantic>
  );
};

const SemanticItem = ({ semanticColor: { container, ...semanticColor }, label }: DisplaySemanticColor) => {
  return (
    <StyledColorItem size={6}>
      <SemanticTone tonalContrast={container}>
        <SemanticTone tonalContrast={semanticColor}>
          {label}
        </SemanticTone>
        Container
      </SemanticTone>
    </StyledColorItem>
  );
};
const SemanticGrid = ({ colors }: { colors: DisplaySemanticColor[] }) => (
  <StyledColorGrid container spacing={2}>
    {colors.map((props) => (
      <SemanticItem {...props} key={props.label} />
    ))}
  </StyledColorGrid>
);

export const ColorPalette = () => {
  const { theme } = useTheme();
  const colors = useMemo(() => getColours(theme), [theme]);

  return (
    <>
      <SemanticGrid colors={colors.semantics} />
      <Divider />
      <ColorGrid colors={colors.system} />
      <ColorGrid colors={colors.message} />
      <ColorGrid colors={colors.grey} />
      <Divider />
      <HueTones />
    </>
  );
};
