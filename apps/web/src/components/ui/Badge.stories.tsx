import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@gxqs/ui';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'md',
    },
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Badge',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
  },
};
