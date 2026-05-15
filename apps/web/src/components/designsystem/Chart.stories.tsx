import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'DesignSystem/Chart',
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
      <h2 className="text-lg font-mono text-gxqs-accent mb-2">Chart Component</h2>
      <p className="text-gxqs-muted">(Component coming soon)</p>
    </div>
  ),
};
