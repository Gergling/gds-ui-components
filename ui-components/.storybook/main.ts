import type { StorybookConfig } from '@storybook/react-vite';
import { InlineConfig, UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
  async viteFinal(config) {
    const { mergeConfig, searchForWorkspaceRoot } = await import('vite');
    return mergeConfig<InlineConfig, UserConfig>(config, {
      server: {
        fs: {
          allow: [
            searchForWorkspaceRoot(process.cwd()),
          ],
        },
      },
    });
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
