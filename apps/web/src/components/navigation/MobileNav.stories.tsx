import type { Meta, StoryObj } from '@storybook/react';
import MobileNav from './MobileNav';

const meta: Meta<typeof MobileNav> = {
  title: 'Navigation/MobileNav',
  component: MobileNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'xs',
    },
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    onOpenDrawer: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof MobileNav>;

export const Default: Story = {};
export const Desktop: Story = {
  args: {
    onOpenDrawer: () => {},
  },
  parameters: { viewport: { defaultViewport: 'xl' } },
};
