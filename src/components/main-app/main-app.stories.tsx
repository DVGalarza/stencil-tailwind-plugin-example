import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/MainApp',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => '<main-app></main-app>',
};
