import styled from "@emotion/styled";

// Find suitable MUI for grid.
// Need 4 columns, so probably maximum width up to responsive breakpoint is a good choice.
export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
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
  `;
  // background-color: ${(props) => props.theme.colors.surface};
  // color: ${(props) => props.theme.colors.onSurface};

export const ColorName = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const ColorValue = styled.div`
  font-size: 12px;
  word-break: break-all;
`;
