import { PokemonDetails } from '../interfaces/Pokemon'

export function transformOne(pokemon: PokemonDetails): PokemonDetails {
  const {
    id,
    name,
    height,
    weight,
    base_experience,
    abilities,
    types,
    sprites,
  } = pokemon
  return {
    id,
    name,
    height,
    weight,
    base_experience,
    abilities,
    types,
    sprites,
  }
}

export function transformCollection(
  pokemons: PokemonDetails[],
): PokemonDetails[] {
  return pokemons.map(transformOne)
}
