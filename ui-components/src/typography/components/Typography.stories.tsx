import { Typography } from './Typography';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Data Display/Typography',
};

export default meta;
type Story = StoryObj<typeof Typography>;

const defaultText = `This is my typography. There are many like it, but this one is mine.`;

export const h1: Story = {
  args: {
    variant: 'h1',
    children: defaultText,
  },
};
export const h2: Story = {
  args: {
    variant: 'h2',
    children: defaultText,
  },
};
export const h3: Story = {
  args: {
    variant: 'h3',
    children: defaultText,
  },
};
export const h4: Story = {
  args: {
    variant: 'h4',
    children: defaultText,
  },
};
export const h5: Story = {
  args: {
    variant: 'h5',
    children: defaultText,
  },
};
export const h6: Story = {
  args: {
    variant: 'h6',
    children: defaultText,
  },
};
export const body1: Story = {
  args: {
    variant: 'body1',
    children: defaultText,
  },
};
export const body2: Story = {
  args: {
    variant: 'body2',
    children: defaultText,
  },
};
