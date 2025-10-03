import { Preview } from '@storybook/react';
import {
  AppThemeProvider,
  ThemeSwitcher,
} from '../src/theme';
import { ErrorBoundary } from 'react-error-boundary';

import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        tablet: {
          name: 'Tablet',
          styles: {
            width: '1024px',
            height: '1366px',
          },
          type: 'tablet',
        },
      },
    }
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
