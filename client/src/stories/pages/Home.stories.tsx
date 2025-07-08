import type { Meta, StoryObj } from '@storybook/react-vite';
import Home from '../../pages/Home'; 

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};