export interface PokemonList {
  count: number
  next: boolean | null
  previous: boolean | null
  results: PokemonListDetails[]
}

export interface PokemonListDetails {
  id: number
  name: string
  url: string
}
export interface PokemonDetails {
  id: number
  name: string
}
