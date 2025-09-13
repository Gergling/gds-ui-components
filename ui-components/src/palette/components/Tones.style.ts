import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const StyledToneSwatch = styled(Grid)<{
  backgroundColor: string;
}>`
  position: relative;
  padding: 0.5rem;
`;

export const StyledToneValue = styled.div`
  margin: auto;
  width: 1rem;
  height: 1rem;
  color: white;
  background-color: rgba(0,0,0,0.7);
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

export const StyledHueTones = styled.div`
  padding: 1rem 0;
`;
