import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: 'Surfaces/AppHeader',
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Large: Story = {
  args: {
    title: 'Gregory, Michael & Davies',
    openMenu: action('openMenu'),
  },
};
