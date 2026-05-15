import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Dashboard/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'md',
    },
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  args: {},
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'xs' },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: { defaultViewport: 'xl' },
  },
};
