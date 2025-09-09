import type { Meta, StoryObj } from '@storybook/react';
import { Pane } from './Pane.component';

const meta: Meta<typeof Pane> = {
  component: Pane,
  title: 'Components/Pane',
};

export default meta;
type Story = StoryObj<typeof Pane>;

/**
 * A default story for the Pane component.
 * It demonstrates a basic use case with some text content inside the pane.
 */
export const Default: Story = {
  args: {
    children: (
      <div>
        This is a basic pane. It's a container component that you can use to wrap other elements.
      </div>
    ),
  },
};
