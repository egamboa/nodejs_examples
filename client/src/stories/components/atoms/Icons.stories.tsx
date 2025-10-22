import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart } from 'lucide-react';

const meta: Meta = {
  title: 'Design System/Atoms/Icons',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className="flex gap-12 items-start justify-center p-8 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <Heart />
            <span className="mt-2 text-xs">Heart</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
