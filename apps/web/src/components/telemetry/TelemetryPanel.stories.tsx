import type { Meta, StoryObj } from '@storybook/react';
import { TelemetryPanel } from './TelemetryPanel';

const meta: Meta<typeof TelemetryPanel> = {
  title: 'Dashboard/TelemetryPanel',
  component: TelemetryPanel,
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

type Story = StoryObj<typeof TelemetryPanel>;

export const Default: Story = {};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'xs' } },
};
export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
};
