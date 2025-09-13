import { Grid } from "@mui/material";
import { toneBrightnessList, toneHueList } from "../utilities";
import { StyledHueTones, StyledToneSwatch, StyledToneValue } from "./Tones.style";

const ToneSwatch = ({
  backgroundColor,
  value
}: {
  backgroundColor: string;
  value: string | number;
}) => (
  <StyledToneSwatch size={1} backgroundColor={backgroundColor}>
    <StyledToneValue>{value}</StyledToneValue>
  </StyledToneSwatch>
);

const Tone = ({ hue, tone }: { hue: number; tone: number; }) => {
  const backgroundColor = `hsl(${hue}, 100%, ${tone}%)`;
  return <ToneSwatch backgroundColor={backgroundColor} value={tone} />;
};

const Tones = ({ hue }: { hue: number; }) => {
  return (
    <Grid columns={13} container>
      <ToneSwatch backgroundColor='#000' value={hue} />
      {toneBrightnessList.map((tone) => <Tone hue={hue} tone={tone} key={`${hue}-${tone}`} />)}
    </Grid>
  );
}

const GreyscaleTones = () => (
  <Grid columns={13} container>
    <ToneSwatch backgroundColor='#000' value='NA' />
    {toneBrightnessList.map((tone) => <ToneSwatch
      backgroundColor={`hsl(0, 0%, ${tone}%)`}
      value={tone}
    />)}
  </Grid>
);

export const HueTones = () => {
  return <StyledHueTones>
    <div>
      {toneHueList.map((hue) => <Tones hue={hue} />)}
    </div>
    <div>
      <GreyscaleTones />
    </div>
  </StyledHueTones>;
};
