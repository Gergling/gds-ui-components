import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';
import { action } from 'storybook/internal/actions';

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: 'Surfaces/AppHeader',
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  args: {
    title: 'Gregory, Michael & Davies',
    openMenu: action('openMenu'),
  },
};
