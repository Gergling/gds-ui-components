import { Preview } from '@storybook/react';
import { AppThemeProvider, ThemeSwitcher } from '../src/theme';
import { ErrorBoundary } from 'react-error-boundary';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <ErrorBoundary fallback={<div>Something bad has happened.</div>}>
          <ThemeSwitcher />
          <Story />
        </ErrorBoundary>
      </AppThemeProvider>
    ),
  ],
};

export default preview;
