import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../../../components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
  }
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
