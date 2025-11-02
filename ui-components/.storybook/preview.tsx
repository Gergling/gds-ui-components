import { Preview } from '@storybook/react';
import {
  AppThemeProvider,
} from '../src/theme';

import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { ThemedPreview } from './components/ThemedPreview';
import { GlobalTypes } from 'storybook/internal/csf';

export const globalTypes: GlobalTypes = {
  themeMode: {
    name: 'Theme Mode',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light Mode', icon: 'sun' },
        { value: 'dark', title: 'Dark Mode', icon: 'moon' },
      ],
    },
  },
};

export const globals = {
  themeMode: 'light', // Default state
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
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
    (Story, context) => {
      const { globals } = context;
      return (
        <AppThemeProvider>
          <ThemedPreview globals={globals}>
            <Story />
          </ThemedPreview>
        </AppThemeProvider>
      );
    },
  ],
};

export default preview;
