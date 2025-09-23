import { ChipProps } from "@mui/material";
import { useMemo } from "react";
import { useAppTheme } from "../../theme";
import {
  StyledMetricChipContainer,
  StyledMetricChipLabel,
  StyledMetricChipMiddle,
  StyledMetricChipMiddleDefault,
  StyledMetricChipRight,
  StyledMetricChipRightIconDefault,
  StyledMetricChipRightValueDefault,
} from "./MetricChip.style";

type MetricChipColorDefaultProps = {
  icon?: ChipProps['icon'];
  value: string;
};

const MetricChipColorDefault = ({
  icon,
  value,
}: MetricChipColorDefaultProps) => {
  const {
    theme: { palette: { action, getContrastText } },
  } = useAppTheme();
  const backgroundColor = useMemo(() => action.active, [action]);
  const foregroundColor = useMemo(() => getContrastText(action.active), [action, getContrastText]);

  if (icon === undefined) {
    return <StyledMetricChipRightValueDefault
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      label={value}
    />;
  }

  return <>
    <StyledMetricChipMiddleDefault
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      label={value}
    />
    <StyledMetricChipRightIconDefault
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      icon={icon}
    />
  </>;
};

type MetricChipColorProps = MetricChipColorDefaultProps & {
  color?: ChipProps['color'];
};

const MetricChipColor = ({
  color,
  icon,
  value,
}: MetricChipColorProps) => {
  if (icon === undefined) {
    return <StyledMetricChipRight
      color={color}
      label={value}
    />;
  }

  return <>
    <StyledMetricChipMiddle
      color={color}
      label={value}
    />
    <StyledMetricChipRight
      color={color}
      icon={icon}
    />
  </>;
};

type MetricChipProps = MetricChipColorProps & {
  label: string;
};

export const MetricChip = ({
  color,
  icon,
  label,
  value,
}: MetricChipProps) => {
  return (
    <StyledMetricChipContainer>
      <StyledMetricChipLabel
        label={label}
      />
      {!color || color === 'default'
        ? <MetricChipColorDefault
          icon={icon}
          value={value}
        />
        : <MetricChipColor
          color={color}
          icon={icon}
          value={value}
        />
      }
    </StyledMetricChipContainer>
  )
};
