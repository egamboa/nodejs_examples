import type { Meta, StoryObj } from '@storybook/react-vite';
import Welcome from '../../pages/Welcome';

const meta: Meta<typeof Welcome> = {
  title: 'Pages/Welcome',
  component: Welcome,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};