export interface PokemonList {
  count: number
  next: boolean | null
  previous: boolean | null
  results: PokemonDetails[]
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: Array<{ ability: { name: string; url: string } }>
  types: Array<{ type: { name: string; url: string } }>
  sprites: {
    front_default: string
    back_default: string
    other?: {
      'official-artwork'?: { front_default?: string; back_default?: string }
    }
  }
}

