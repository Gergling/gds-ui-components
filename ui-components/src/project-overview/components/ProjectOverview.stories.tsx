import type { Meta, StoryObj } from '@storybook/react';
import { ProjectOverview } from './ProjectOverview';

const meta: Meta<typeof ProjectOverview> = {
  component: ProjectOverview,
  title: 'Projects',
};

export default meta;
type Story = StoryObj<typeof ProjectOverview>;

export const Overview: Story = {
  args: {},
};
