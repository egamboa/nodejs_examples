import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '../../../components/molecules/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Design System/Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    pageNumber: { control: 'number' },
    changePage: { action: 'changed' },
    next: { control: 'boolean' },
    count: { control: 'number' },
    pageSize: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// A more realistic story showcasing the card with Pokémon content
export const PaginationPreview: Story = {
  args: {
    pageNumber: 1,
    changePage: (newPage: number) => console.log('Page changed to:', newPage),
    next: true,
    count: 50,
    pageSize: 10,
  }
};
