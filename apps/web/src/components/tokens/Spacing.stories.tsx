import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/Spacing',
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

type Story = StoryObj;

export const AllSpacing: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Spacing Tokens</h3>
      <ul>
        <li>xs: clamp(0.5rem, 1vw, 1rem)</li>
        <li>sm: clamp(1rem, 2vw, 2rem)</li>
        <li>md: clamp(2rem, 4vw, 4rem)</li>
        <li>lg: clamp(4rem, 6vw, 6rem)</li>
        <li>xl: clamp(6rem, 8vw, 8rem)</li>
      </ul>
    </div>
  ),
};
