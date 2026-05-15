import type { Meta, StoryObj } from '@storybook/react';
import { WalletPanel } from './WalletPanel';

const meta: Meta<typeof WalletPanel> = {
  title: 'Dashboard/WalletPanel',
  component: WalletPanel,
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

type Story = StoryObj<typeof WalletPanel>;

export const Default: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'xs' } },
};
export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
};
