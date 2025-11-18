import styled from "@emotion/styled";

export const StyledDateDisplay = styled.span<{ empty: boolean; }>`
  color: ${({ empty, theme: { palette } }) => empty ? palette.text.disabled : palette.text.primary};
`;
