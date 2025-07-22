import type { Meta, StoryObj } from '@storybook/react-vite';
import Label from '../../../components/atoms/Label';

const meta: Meta<typeof Label> = {
  title: 'Design System/Atoms/Label',
  component: Label,
  tags: ['autodocs'],
   argTypes: {
    children: { control: 'text' },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Email Address'
    }
};
