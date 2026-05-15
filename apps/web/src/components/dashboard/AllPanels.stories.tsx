import type { Meta, StoryObj } from '@storybook/react';
import { MiningPanel } from '../mining/MiningPanel';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { ValidatorPanel } from '../validator/ValidatorPanel';
import { WalletPanel } from '../wallet/WalletPanel';

const meta: Meta = {
  title: 'Dashboard/AllPanels',
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

type Story = StoryObj;

export const AllPanels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <MiningPanel />
      <TelemetryPanel />
      <ValidatorPanel />
      <WalletPanel />
    </div>
  ),
};
