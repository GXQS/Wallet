import type { Meta, StoryObj } from '@storybook/react';
import { ExtensionModesPanel } from './ExtensionModesPanel';

const meta: Meta<typeof ExtensionModesPanel> = {
  title: 'Extension/ExtensionModesPanel',
  component: ExtensionModesPanel,
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

type Story = StoryObj<typeof ExtensionModesPanel>;

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
