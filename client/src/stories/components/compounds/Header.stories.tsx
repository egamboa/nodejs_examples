import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Header } from '../../../components/compounds/Header'
import { MockAuthProvider } from '../../mocks/MockAuthProvider'

const meta: Meta<typeof Header> = {
  title: 'Design System/Compounds/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogout: fn(),
  },
}
export default meta

type Story = StoryObj<typeof Header>

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <MockAuthProvider mockUser={{ id: 1, name: 'Ash Ketchum', email: 'ash@poke.com' }}>
        <Story />
      </MockAuthProvider>
    )
  ]
}

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <MockAuthProvider mockUser={null}>
        <Story />
      </MockAuthProvider>
    ),
  ],
}
