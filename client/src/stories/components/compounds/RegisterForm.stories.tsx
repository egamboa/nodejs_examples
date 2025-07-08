import type { Meta, StoryObj } from '@storybook/react-vite';
import RegisterForm from '../../../components/compounds/RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Design System/Compounds/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
