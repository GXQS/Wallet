import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'DesignSystem/Button',
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
    <button className="glass rounded-lg px-4 py-2 text-gxqs-primary border border-gxqs-primary/40 hover:bg-gxqs-primary/10 transition-colors">
      GXQS Button
    </button>
  ),
};
