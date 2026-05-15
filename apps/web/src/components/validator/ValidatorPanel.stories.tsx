import type { Meta, StoryObj } from '@storybook/react';
import { ValidatorPanel } from './ValidatorPanel';

const meta: Meta<typeof ValidatorPanel> = {
  title: 'Dashboard/ValidatorPanel',
  component: ValidatorPanel,
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

type Story = StoryObj<typeof ValidatorPanel>;

export const Default: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'xs' } },
};
export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
};
