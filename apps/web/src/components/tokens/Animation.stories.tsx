import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/Animation',
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

export const AllAnimations: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Animation Tokens</h3>
      <ul>
        <li>pulse-slow: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite</li>
        <li>glow: glow 2s ease-in-out infinite alternate</li>
        <li>glow-accent: glow-accent 2s ease-in-out infinite alternate</li>
        <li>scan-line: scan-line 4s linear infinite</li>
      </ul>
    </div>
  ),
};
