import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '../../../components/atoms/Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
    disabled: { control: 'boolean' },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'ash@ketchum.com',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
