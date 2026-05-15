import type { Meta, StoryObj } from '@storybook/react';
import { NavSidebar } from './NavSidebar';

const meta: Meta<typeof NavSidebar> = {
  title: 'Dashboard/NavSidebar',
  component: NavSidebar,
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

type Story = StoryObj<typeof NavSidebar>;

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
