import type { Meta, StoryObj } from '@storybook/react';
import { Card, Badge, StatusDot } from '@gxqs/ui';

const meta: Meta = {
  title: 'Wallet/WalletCards',
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'xs' },
    backgrounds: { default: 'dark' },
    a11y: { disable: false },
  },
};

export default meta;
type Story = StoryObj;

export const PrimaryWalletCard: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Card title="Primary Wallet">
        <div className="flex items-center justify-between mb-3">
          <Badge label="Mainnet" variant="success" />
          <StatusDot status="online" label="Synced" />
        </div>
        <div className="text-xs font-mono text-gxqs-muted mb-1">Address</div>
        <div className="text-sm font-mono text-white mb-3 break-all">gxqs1q3m7...7v2c0f</div>
        <div className="text-xs font-mono text-gxqs-muted mb-1">Balance</div>
        <div className="text-xl font-mono text-gxqs-primary">0.0000 GXQS</div>
      </Card>
    </div>
  ),
};

export const DesktopWalletCards: Story = {
  parameters: { viewport: { defaultViewport: 'xl' } },
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
      <Card title="Operations Wallet">
        <Badge label="Testnet" variant="warning" />
        <div className="mt-3 text-sm text-white">Cold-signing queue: 0 pending</div>
      </Card>
      <Card title="Treasury Wallet">
        <StatusDot status="offline" label="Locked" />
        <div className="mt-3 text-sm text-white">Policy guard: enforced</div>
      </Card>
    </div>
  ),
};
