/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

// Define the styled component
const StyledPane = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
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

export default Pane;
