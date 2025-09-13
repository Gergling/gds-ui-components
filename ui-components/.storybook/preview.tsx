import { Preview } from '@storybook/react';
import { AppThemeProvider, ThemeSwitcher } from '../src/theme';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <ThemeSwitcher />
        <Story />
      </AppThemeProvider>
    ),
  ],
};

export default preview;
