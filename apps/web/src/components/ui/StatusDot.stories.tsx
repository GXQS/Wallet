import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from '@gxqs/ui';

const meta: Meta<typeof StatusDot> = {
  title: 'UI/StatusDot',
  component: StatusDot,
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

type Story = StoryObj<typeof StatusDot>;

export const Online: Story = {
  args: {
    status: 'online',
    label: 'Online',
  },
};

export const Offline: Story = {
  args: {
    status: 'offline',
    label: 'Offline',
  },
};

export const Syncing: Story = {
  args: {
    status: 'syncing',
    label: 'Syncing',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    label: 'Warning',
  },
};
