import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@gxqs/ui';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'md',
    },
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a glassmorphic card.',
    title: 'Wallet Card',
  },
};

export const Glassmorphism: Story = {
  args: {
    children: (
      <div>
        <div className="mb-2">
          This card uses the <code>glass</code> class for glassmorphism.
        </div>
        <div className="h-8 w-full bg-gxqs-primary/20 rounded" />
      </div>
    ),
    title: 'Glassmorphism Validation',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom class for extra styling.',
    className: 'border-2 border-gxqs-accent',
    title: 'Custom Card',
  },
};
