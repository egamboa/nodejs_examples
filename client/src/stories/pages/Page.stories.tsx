import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Page from './Page'; // Adjusted path assuming stories are in a top-level folder

// This is a mock component to demonstrate the wrapper functionality
const MockRegisterPage = () => (
  <div className="w-full max-w-md bg-indigo-800 bg-opacity-50 shadow-2xl rounded-2xl p-8 text-white">
    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
    <p className="text-center">This is where the registration form would go.</p>
    <button className="mt-6 w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition duration-200">
      Mock Register Button
    </button>
  </div>
);

const meta: Meta<typeof Page> = {
  title: 'Layout/Page',
  component: Page,
  // The decorator wraps the story in a router so the <Link> in the header works
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'], // Enables automatic documentation generation
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story that shows the Page component wrapping a mock register page
export const WithRegisterPage: Story = {
  args: {
    // The 'children' prop is where we pass the component to be wrapped
    children: <MockRegisterPage />,
  },
};

// Story that shows the Page component with simple text content
export const WithSimpleText: Story = {
  args: {
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Hello, World!</h2>
        <p>This is the generic page wrapper with simple text content.</p>
      </div>
    ),
  },
};