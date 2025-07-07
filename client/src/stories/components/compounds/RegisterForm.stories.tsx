import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../../../components/compounds/RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Compounds/RegisterForm',
  component: RegisterForm,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="p-8 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
