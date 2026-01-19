import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/DemoCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    cardTitle: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    cardTitle: 'Example Card',
    subtitle: 'This is a subtitle',
  },
  render: (args) => {
    return `<demo-card card-title="${args.cardTitle}" subtitle="${args.subtitle}"></demo-card>`;
  },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    cardTitle: 'Functional Components',
    subtitle: 'Stencil components are just functions',
  },
};

export const WithBadges: Story = {
  args: {
    cardTitle: 'Form Components',
    subtitle: 'Using @tailwindcss/forms',
  },
  render: (args) => {
    return `
      <demo-card card-title="${args.cardTitle}" subtitle="${args.subtitle}">
        <span class="px-3 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">Badge 1</span>
        <span class="px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full">Badge 2</span>
      </demo-card>
    `;
  },
};

export const Empty: Story = {
  args: {
    cardTitle: 'Empty Card',
    subtitle: 'No slot content',
  },
};
