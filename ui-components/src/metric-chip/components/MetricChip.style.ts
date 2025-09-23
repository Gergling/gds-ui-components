import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Chip } from "@mui/material";

const resetRight = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
const resetLeft = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const baseLeft = css`
  ${resetRight}
`;
const baseMiddle = css`
  ${resetLeft}
  ${resetRight}
`;
const baseRight = css`
  ${resetLeft}
`;

const StyledMetricChipBase = styled(Chip)`
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
`;
const StyledMetricChipBaseColor = styled(StyledMetricChipBase)``;
const StyledMetricChipBaseColorCustom = styled(StyledMetricChipBase)<{
  backgroundColor: string;
  foregroundColor: string;
}>`
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ foregroundColor }) => foregroundColor && `color: ${foregroundColor};`}
`;

export const StyledMetricChipLabel = styled(StyledMetricChipBase)`
  ${baseLeft}
`;

export const StyledMetricChipMiddle = styled(StyledMetricChipBaseColor)`
  ${baseMiddle}
`;
export const StyledMetricChipRight = styled(StyledMetricChipBaseColor)`
  ${baseRight}
`;

export const StyledMetricChipMiddleDefault = styled(StyledMetricChipBaseColorCustom)`
  ${baseMiddle}
`;
export const StyledMetricChipRightValueDefault = styled(StyledMetricChipBaseColorCustom)`
  ${baseRight}
`;
export const StyledMetricChipRightIconDefault = styled(StyledMetricChipRightValueDefault)`
  & > .MuiChip-icon {
    color: ${({ foregroundColor }) => foregroundColor};
  }
`;

export const StyledMetricChipContainer = styled.div`
  display: flex;
`;
