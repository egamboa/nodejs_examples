import type { Meta, StoryObj } from '@storybook/react-vite';
import SignUp from '../../pages/SignUp';

const meta: Meta<typeof SignUp> = {
  title: 'Pages/SignUp',
  component: SignUp
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};