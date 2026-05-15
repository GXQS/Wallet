import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/FontSize',
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

export const AllFontSizes: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Font Size Tokens</h3>
      <ul>
        <li>xs: clamp(0.75rem, 1vw, 1rem)</li>
        <li>sm: clamp(1rem, 1.5vw, 1.25rem)</li>
        <li>md: clamp(1.25rem, 2vw, 1.5rem)</li>
        <li>lg: clamp(1.5rem, 2.5vw, 2rem)</li>
        <li>xl: clamp(2rem, 3vw, 2.5rem)</li>
      </ul>
    </div>
  ),
};
