/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

// Define the styled component
const StyledPane = styled.div`
  background-color: ${({ theme: { palette: { grey, mode } } }) => mode === 'dark' ? grey[800] : grey[300]};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.palette.getContrastText(theme.palette.background.default)};
`;

// Define the component's props
interface PaneProps {
  children: ReactNode;
}

/**
 * A simple container component with a styled background, padding, and border.
 */
export const Pane: React.FC<PaneProps> = ({ children }) => {
  return <StyledPane>{children}</StyledPane>;
};

