import type { Meta, StoryObj } from '@storybook/react-vite';
import Search from '../../pages/Search'; 

const meta: Meta<typeof Search> = {
  title: 'Pages/Search',
  component: Search,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};