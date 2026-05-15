import type { Meta, StoryObj } from '@storybook/react';
import { AIAssistantPanel } from '../ai/AIAssistantPanel';

const meta: Meta<typeof AIAssistantPanel> = {
  title: 'AI/AIAssistantPanel',
  component: AIAssistantPanel,
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

type Story = StoryObj<typeof AIAssistantPanel>;

export const Desktop: Story = {
  args: { mode: 'desktop' },
};
export const Tablet: Story = {
  args: { mode: 'tablet' },
  parameters: { viewport: { defaultViewport: 'md' } },
};
export const Mobile: Story = {
  args: { mode: 'phone' },
  parameters: { viewport: { defaultViewport: 'xs' } },
};
