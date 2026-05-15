import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { useContainerMode } from '../../hooks/useContainerMode';

const meta: Meta = {
  title: 'Hooks/useContainerMode',
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

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const mode = useContainerMode(ref);
    return (
      <div ref={ref} style={{ width: 'min(100%, 640px)' }}>
        <pre style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
          {JSON.stringify(mode, null, 2)}
        </pre>
      </div>
    );
  },
};
