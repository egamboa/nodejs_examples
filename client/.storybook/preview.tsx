import type { Preview } from '@storybook/react-vite'
import { MockAuthProvider } from '../src/stories/mocks/MockAuthProvider'
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MockAuthProvider>
        <MemoryRouter>
          <div className="p-4 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-600">
            <Story />
          </div>
        </MemoryRouter>
      </MockAuthProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Layout',
          'Pages',
          'Design System',
          ['Atoms', 'Molecules', 'Compounds'],
        ],
      },
    },
  },
};

export default preview;