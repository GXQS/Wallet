import type { Meta, StoryObj } from '@storybook/react';
import { useAdaptiveRuntime } from '../../hooks/useAdaptiveRuntime';

const meta: Meta = {
  title: 'Hooks/useAdaptiveRuntime',
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
    const runtime = useAdaptiveRuntime();
    return (
      <pre style={{ color: '#00ffe1', background: '#111118', padding: 16, borderRadius: 8 }}>
        {JSON.stringify(runtime, null, 2)}
      </pre>
    );
  },
};
