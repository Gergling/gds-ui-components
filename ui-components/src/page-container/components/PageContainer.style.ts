import styled from "@emotion/styled";

export const Content = styled.div<{
  appHeaderHeight: number;
  containerLeftMargin: number;
}>`
  margin-top: ${({ appHeaderHeight }) => appHeaderHeight}px;
  margin-left: ${({ containerLeftMargin }) => containerLeftMargin}px;
  transition: ${({ theme: { transitions: { create } } }) => create('margin-left')};
`;
  // transition: ${({ theme: { transition } }) => margin-left 0.3s ease-in-out};
