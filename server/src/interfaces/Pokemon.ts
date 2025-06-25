export interface PokemonList {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  abilities: { ability: { name: string; url: string } }[]
  types: { type: { name: string; url: string } }[]
  sprites: {
    front_default: string
    back_default: string
    other?: {
      'official-artwork'?: {
        front_default?: string
        back_default?: string
      }
    }
  }
}
