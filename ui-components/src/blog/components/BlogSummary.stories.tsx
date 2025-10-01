import type { Meta, StoryObj } from '@storybook/react';
import { BlogSummary } from './BlogSummary';

const meta: Meta<typeof BlogSummary> = {
  component: BlogSummary,
  title: 'Surfaces/Blog Summary',
};

export default meta;
type Story = StoryObj<typeof BlogSummary>;

export const Default: Story = {
  args: {
    media: {
      image: '/images/grey.png',
    },
    subheader: 'Published 13 minutes ago',
    title: 'Bananas and the socioeconomic implications of shorting against the base rate',
  },
};
