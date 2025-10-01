import type { Meta, StoryObj } from '@storybook/react';
import { ColorPalette } from './Palette.component';

const meta: Meta<typeof ColorPalette> = {
  component: ColorPalette,
  title: 'Theme/Color Palette',
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {
  args: {},
};
