import type { Meta, StoryObj } from '@storybook/react-vite'
import PokemonList from '../../../components/compounds/PokemonList';
import type { PokemonDetails } from '../../../interfaces/Pokemon';

export default {
  title: 'Design System/Compounds/PokemonList',
  component: PokemonList,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof PokemonList>;

const Template: Story = {
  render: (args) => <PokemonList {...args} />,
  args: {
    pokemons: [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Ivysaur' },
      { id: 3, name: 'Venusaur' },
    ] as PokemonDetails[],
  },
};

const mockPokemon: PokemonDetails[] = [
  { id: 1, name: 'Bulbasaur', height: 1, weight: 1, base_experience: 1, abilities: [], types: [ { type: { name: 'grass', url: '' } }, { type: { name: 'poison', url: '' } } ], sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png' } },
  { id: 2, name: 'Ivysaur', height: 1, weight: 1, base_experience: 1, abilities: [], types: [ { type: { name: 'grass', url: '' } }, { type: { name: 'poison', url: '' } } ], sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png' } },
  { id: 3, name: 'Venusaur', height: 1, weight: 1, base_experience: 1, abilities: [], types: [ { type: { name: 'grass', url: '' } }, { type: { name: 'poison', url: '' } } ], sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png' } },
  { id: 4, name: 'Venusaur', height: 1, weight: 1, base_experience: 1, abilities: [], types: [ { type: { name: 'grass', url: '' } }, { type: { name: 'poison', url: '' } } ], sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png' } },
  { id: 5, name: 'Ivysaur', height: 1, weight: 1, base_experience: 1, abilities: [], types: [ { type: { name: 'grass', url: '' } }, { type: { name: 'poison', url: '' } } ], sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png' } },
];

export const Default = {
  ...Template,
  args: {
    pokemons: mockPokemon,
  },
};