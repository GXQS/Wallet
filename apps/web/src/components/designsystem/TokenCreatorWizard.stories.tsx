import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'DesignSystem/TokenCreatorWizard',
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'md' },
    backgrounds: { default: 'dark' },
    a11y: { disable: false },
  },
};
export default meta;

type Story = StoryObj;

export const Placeholder: Story = {
  render: () => (
    <div className="glass rounded-xl p-6 text-center">
      <h2 className="text-lg font-mono text-gxqs-primary mb-2">Token Creator Wizard</h2>
      <p className="text-gxqs-muted">(Component coming soon)</p>
    </div>
  ),
};
