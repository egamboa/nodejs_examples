import { transformOne, transformCollection } from '../pokemon.transformer'
import { PokemonDetails } from '../../interfaces/Pokemon'

const mockPokemon: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
    },
  ],
  types: [
    {
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
  sprites: {
    front_default: 'front.png',
    back_default: 'back.png',
    other: {
      'official-artwork': {
        front_default: 'art-front.png',
        back_default: 'art-back.png',
      },
    },
  },
}

describe('Pokemon Transformer', () => {
  describe('transformOne', () => {
    it('should transform a single PokemonDetails object', () => {
      const result = transformOne(mockPokemon)
      expect(result).toEqual(mockPokemon)
    })
  })

  describe('transformCollection', () => {
    it('should transform a collection of PokemonDetails', () => {
      const result = transformCollection([mockPokemon, mockPokemon])
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual(mockPokemon)
      expect(result[1]).toEqual(mockPokemon)
    })
  })
})
