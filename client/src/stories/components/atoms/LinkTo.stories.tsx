import type { Meta, StoryObj } from '@storybook/react-vite'
import LinkTo from '../../../components/atoms/LinkTo'

const meta: Meta<typeof LinkTo> = {
  title: 'Design System/Atoms/LinkTo',
  component: LinkTo,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof LinkTo>

export const Default: Story = {
  args: {
    to: '/login',
    children: 'Go to Login',
  },
}

export const AsButton: Story = {
  args: {
    to: '/dashboard',
    children: 'Dashboard',
    asButton: true,
    buttonClassName: 'w-48',
  },
}
export const AsButtonWithVariant: Story = {
  args: {
    to: '/settings',
    children: 'Settings',
    asButton: true,
    buttonVariant: 'secondary',
    buttonClassName: 'w-48',
  },
}