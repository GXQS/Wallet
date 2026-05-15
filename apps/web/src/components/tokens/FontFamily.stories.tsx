import type { Meta, StoryObj } from '@storybook/react';
import '../app/globals.css';

const meta: Meta = {
  title: 'Tokens/FontFamily',
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

export const AllFontFamilies: Story = {
  render: () => (
    <div style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
      <h3>GXQS Font Families</h3>
      <ul>
        <li>mono: JetBrains Mono, Fira Code, ui-monospace, monospace</li>
        <li>sans: Inter, ui-sans-serif, system-ui</li>
      </ul>
    </div>
  ),
};
