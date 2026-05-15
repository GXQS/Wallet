import type { Meta, StoryObj } from '@storybook/react';
import { MiningPanel } from './MiningPanel';

const meta: Meta<typeof MiningPanel> = {
  title: 'Dashboard/MiningPanel',
  component: MiningPanel,
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

type Story = StoryObj<typeof MiningPanel>;

export const Default: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'xs' } },
};
export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
};
