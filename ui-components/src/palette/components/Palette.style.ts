import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { TonalContrast } from "../../theme/types";

export const StyledColorGrid = styled(Grid)`
  padding: 1rem 0 0 0;
`;

export const StyledColorItem = styled(Grid)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  // border: 1px solid ${(props) => props.theme.colors.surfaceVariant};

export const ColorSwatch = styled.div<{ color: string }>`
  height: 50px;
  background-color: ${(props) => props.color};
`;

// TODO: Contents should be inline.
export const ColorDetails = styled.div`
  padding: 8px;
  background-color: hsl(0, 0%, 20%);
  color: hsl(0, 0%, 80%);
`;

export const ColorName = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const ColorValue = styled.div`
  font-size: 12px;
  word-break: break-all;
`;

export const StyledSemantic = styled.div<{ tonalContrast: TonalContrast; }>`
  background-color: ${(props) => props.tonalContrast.main};
  border-radius: 8px;
  color: ${(props) => props.tonalContrast.on};
  padding: 1rem;
`;
