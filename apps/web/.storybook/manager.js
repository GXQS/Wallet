// .storybook/manager.js
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'GXQS Wallet',
    brandUrl: 'https://gxqs.com',
    brandImage: null,
    appBg: '#0a0a0f',
    appContentBg: '#111118',
    appBorderColor: '#1e2640',
    colorPrimary: '#00ffe1',
    colorSecondary: '#7b2fff',
  },
});
