import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Preview } from '@storybook/react';

const theme = createTheme();

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
