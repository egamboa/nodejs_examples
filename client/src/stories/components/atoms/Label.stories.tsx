import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from '../../../components/atoms/Label';
import { MemoryRouter } from 'react-router-dom'

const meta: Meta<typeof Label> = {
  title: 'Design System/Atoms/Label',
  component: Label,
  tags: ['autodocs'],
   argTypes: {
    children: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="p-8 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Email Address'
    }
};
