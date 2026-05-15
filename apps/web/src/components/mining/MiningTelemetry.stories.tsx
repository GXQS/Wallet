import type { Meta, StoryObj } from '@storybook/react';
import { MiningPanel } from './MiningPanel';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';

const meta: Meta = {
  title: 'Mining/MiningTelemetry',
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'xs' },
    backgrounds: { default: 'dark' },
    a11y: { disable: false },
  },
};

export default meta;
type Story = StoryObj;

export const MobileStack: Story = {
  render: () => (
    <div className="space-y-3">
      <MiningPanel />
      <TelemetryPanel />
    </div>
  ),
};

export const DesktopGrid: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <MiningPanel />
      <TelemetryPanel />
    </div>
  ),
};
