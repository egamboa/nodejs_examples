import { PokemonDetails } from '../interfaces/Pokemon'

export function transformOne(pokemon: PokemonDetails): PokemonDetails {
  const { id, name } = pokemon
  return {
    id,
    name,
  }
}

export function transformCollection(
  pokemons: PokemonDetails[],
): PokemonDetails[] {
  return pokemons.map(transformOne)
}
