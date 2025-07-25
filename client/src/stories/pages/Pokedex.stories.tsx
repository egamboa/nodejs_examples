import type { Meta, StoryObj } from '@storybook/react-vite';
import Pokedex from '../../pages/Pokedex'; 

const meta: Meta<typeof Pokedex> = {
  title: 'Pages/Pokedex',
  component: Pokedex,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};