import type { Meta, StoryObj } from '@storybook/react';
import { MetricChip } from './MetricChip';
import { ThumbUp } from '@mui/icons-material';

const meta: Meta<typeof MetricChip> = {
  component: MetricChip,
  title: 'Data Display/MetricChip',
  argTypes: {
    color: {
      options: ['default', 'primary', 'secondary', 'tertiary', 'error', 'info', 'success', 'warning'],
      control: { type: 'inline-radio' },
    },
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    icon: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricChip>;

export const NoIcon: Story = {
  name: 'No Icon',
  args: {
    color: 'default',
    label: 'Label',
    value: 'Value',
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    color: 'default',
    label: 'Label',
    value: 'Value',
    icon: <ThumbUp fontSize='small' />,
  },
};
