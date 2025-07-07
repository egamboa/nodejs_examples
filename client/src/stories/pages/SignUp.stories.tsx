import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../../pages/SignUp'; // Adjust the import path to your component

// Basic configuration for the component story
const meta: Meta<typeof SignUp> = {
  title: 'Pages/SignUp',
  component: SignUp,
  // This decorator wraps the story in a router so <Link> works
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    // This makes the story take up the full screen
    layout: 'fullscreen',
  },
};

export default meta;

// Defines the actual story
type Story = StoryObj<typeof meta>;

// This is the default view of your component
export const Default: Story = {};