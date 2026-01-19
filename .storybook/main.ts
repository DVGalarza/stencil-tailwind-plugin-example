import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Set base path for GitHub Pages deployment
    if (process.env.GITHUB_PAGES === 'true') {
      config.base = `/${process.env.REPO_NAME || ''}/`;
    }
    return config;
  },
};

export default config;
