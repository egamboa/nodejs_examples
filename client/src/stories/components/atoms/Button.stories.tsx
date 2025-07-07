import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../../components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Create Account',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Login',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    disabled: true,
  },
};
