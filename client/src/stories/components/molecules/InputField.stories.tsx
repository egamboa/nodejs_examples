import type { Meta, StoryObj } from '@storybook/react-vite';
import InputField from '../../../components/molecules/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Design System/Molecules/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    placeholder: { control: 'text' },
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
