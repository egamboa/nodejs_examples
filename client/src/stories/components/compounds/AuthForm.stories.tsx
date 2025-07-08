import type { Meta, StoryObj } from '@storybook/react-vite';
import AuthForm from '../../../components/compounds/AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Design System/Compounds/AuthForm',
  component: AuthForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};