import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';

const meta: Meta = {
  title: 'DesignSystem/Animation',
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'md' },
    backgrounds: { default: 'dark' },
    a11y: { disable: false },
  },
};
export default meta;

type Story = StoryObj;

export const Pulse: Story = {
  render: () => (
    <motion.div
      className="w-16 h-16 rounded-full bg-gxqs-accent animate-pulse"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    />
  ),
};

export const Glow: Story = {
  render: () => (
    <motion.div
      className="w-32 h-8 rounded-xl bg-gxqs-primary shadow-lg"
      initial={{ boxShadow: '0 0 5px #00ffe140, 0 0 10px #00ffe120' }}
      animate={{
        boxShadow: [
          '0 0 5px #00ffe140, 0 0 10px #00ffe120',
          '0 0 20px #00ffe180, 0 0 40px #00ffe140',
          '0 0 5px #00ffe140, 0 0 10px #00ffe120',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  ),
};
