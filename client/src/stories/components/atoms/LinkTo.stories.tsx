import type { Meta, StoryObj } from '@storybook/react-vite'
import LinkTo from './LinkTo'
import { MemoryRouter } from 'react-router-dom'

const meta: Meta<typeof LinkTo> = {
  title: 'Atoms/Link',
  component: LinkTo,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-indigo-900 min-h-24 flex items-center justify-center">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    to: '/',
    children: 'Go back home',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
