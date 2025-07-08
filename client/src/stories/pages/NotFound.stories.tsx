import type { Meta, StoryObj } from '@storybook/react-vite';
import NotFound from '../../pages/NotFound';

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};