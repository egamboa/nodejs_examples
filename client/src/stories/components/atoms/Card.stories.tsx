import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from '../../../components/atoms/Card';

const meta: Meta<typeof Card> = {
  title: 'Design System/Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' }, // Control is not needed as we'll show a realistic example
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// A more realistic story showcasing the card with Pokémon content
export const PokemonCard: Story = {
  args: {
    children: (
      <div className="text-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h3 className="text-xl font-bold mb-2">Pikachu</h3>
        <div className="flex justify-center gap-2">
          <span className="bg-yellow-300 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Electric
          </span>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs mx-auto">
        <Story />
      </div>
    ),
  ],
};

// The original basic story, renamed for clarity
export const Basic: Story = {
  args: {
    children: <p>This is a basic card component used to display content blocks.</p>,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <Story />
      </div>
    ),
  ],
};