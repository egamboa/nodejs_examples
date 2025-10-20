import type { Meta, StoryObj } from '@storybook/react-vite';
import PokemonCard from '../../../components/molecules/PokemonCard';
import type { PokemonDetails } from '../../../interfaces/Pokemon';

const mockPikachu: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  abilities: [
    {
      ability: {
        name: 'static',
        url: 'https://pokeapi.co/api/v2/ability/9/',
      },
    },
    {
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
    },
  ],
  types: [
    {
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      },
    },
  },
};

const meta: Meta<typeof PokemonCard> = {
  title: 'Design System/Molecules/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
} satisfies Meta<typeof PokemonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// Story using the typed mock data
export const Pikachu: Story = {
  args: {
    ...mockPikachu, // Pass the mock object as a prop
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs mx-auto">
        <Story />
      </div>
    ),
  ],
};