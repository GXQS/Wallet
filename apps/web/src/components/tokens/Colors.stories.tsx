import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/Colors',
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

export const AllColors: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Colors</h3>
      <ul>
        <li>bg: #0a0a0f</li>
        <li>surface: #111118</li>
        <li>border: #1e2640</li>
        <li>primary: #00ffe1</li>
        <li>secondary: #7b2fff</li>
        <li>accent: #ff00d4</li>
        <li>success: #00ff94</li>
        <li>warning: #ff9500</li>
        <li>danger: #ff3b5c</li>
        <li>muted: #4a5578</li>
      </ul>
    </div>
  ),
};
