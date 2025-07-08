import type { Meta, StoryObj } from '@storybook/react-vite';
import Login from '../../pages/Login';

const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};