import styled from "@emotion/styled";

export const StyledDateDisplay = styled.span<{ empty: boolean; }>`
  color: ${({ empty, theme: { palette } }) => empty ? palette.text.disabled : palette.text.primary};
`;

export const StyledMilestoneDateRange = styled.div`
  width: 200px;
`;
