import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Dashboard/TopBar',
  component: TopBar,
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

type Story = StoryObj<typeof TopBar>;

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
