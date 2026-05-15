import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark';
      const isLight = theme === 'light';
      return React.createElement(
        'div',
        {
          'data-theme': theme,
          style: {
            minHeight: '100vh',
            padding: '1rem',
            background: isLight
              ? 'radial-gradient(circle at 20% 10%, #d3f5ff 0%, #f6fbff 45%, #eef2ff 100%)'
              : 'radial-gradient(circle at 10% 20%, rgba(0,255,225,0.08), transparent 40%), radial-gradient(circle at 90% 10%, rgba(255,0,212,0.08), transparent 35%), #0a0a0f',
            color: isLight ? '#111827' : '#f8fafc',
          },
        },
        React.createElement(Story),
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'surface', value: '#111118' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    viewport: {
      defaultViewport: 'xs',
      viewports: {
        xs: {
          name: 'XS (320px)',
          styles: { width: '320px', height: '568px' },
        },
        sm: {
          name: 'SM (480px)',
          styles: { width: '480px', height: '800px' },
        },
        md: {
          name: 'MD (768px)',
          styles: { width: '768px', height: '1024px' },
        },
        lg: {
          name: 'LG (1024px)',
          styles: { width: '1024px', height: '1366px' },
        },
        xl: {
          name: 'XL (1440px)',
          styles: { width: '1440px', height: '900px' },
        },
        '2xl': {
          name: '2XL (1920px)',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },
  },
};

export default preview;
