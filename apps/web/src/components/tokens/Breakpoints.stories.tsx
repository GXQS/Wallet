import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/Breakpoints',
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

export const AllBreakpoints: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Breakpoints</h3>
      <ul>
        <li>XS: 320px</li>
        <li>SM: 480px</li>
        <li>MD: 768px</li>
        <li>LG: 1024px</li>
        <li>XL: 1440px</li>
        <li>2XL: 1920px</li>
      </ul>
    </div>
  ),
};
