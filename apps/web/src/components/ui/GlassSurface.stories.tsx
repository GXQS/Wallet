import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@gxqs/ui';

const meta: Meta<typeof Card> = {
  title: 'DesignSystem/GlassSurface',
  component: Card,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'md' },
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const GlassSurface: Story = {
  args: {
    children: (
      <div>
        <div className="mb-2">
          This surface demonstrates glassmorphism with blur, transparency, and border.
        </div>
        <div className="h-8 w-full bg-gxqs-primary/20 rounded" />
      </div>
    ),
    title: 'Glass Surface',
  },
};
