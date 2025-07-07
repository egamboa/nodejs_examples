import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Page from '../../pages/Page'; // Adjusted path assuming stories are in a top-level folder

// This is a mock component to demonstrate the wrapper functionality
const MockRegisterPage = () => (
  <div className="w-full text-white">
    <h2 className="text-2xl font-bold mb-4 text-center">Sample Page</h2>
    <p className="text-center">This is where the content would go.</p>
    <div className="mt-6 max-w-40 mx-auto">
      <button className="mt-6 w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition duration-200">
        Mock Button
      </button>
    </div>
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