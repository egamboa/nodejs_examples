import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from '../../../components/molecules/Card';

const meta: Meta<typeof Card> = {
  title: 'Design System/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'ash@ketchum.com',
  },
};

export const Password: Story = {
  args: {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••••',
  },
};
