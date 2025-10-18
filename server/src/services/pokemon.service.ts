import axios from 'axios'
import { redis } from '../config/redis'
import { PokemonList, PokemonDetails } from '../interfaces/Pokemon'
import { transformOne } from '../transformers/pokemon.transformer'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'
const CACHE_TTL = 3600 // 1 hour

const genericErrorMessage = {
  status: 500,
  message: 'Server error, please try again later',
}

export async function list(limit: number, offset: number) {
  try {
    const listCacheKey = `pokemon:list:limit=${limit}:offset=${offset}`

    const cachedList = await redis.get(listCacheKey)
    if (cachedList) {
      return JSON.parse(cachedList)
    }

    const { data } = await axios.get<PokemonList>(
      `${POKE_API_URL}?limit=${limit}&offset=${offset}`,
    )

    const results = data.results

    console.log('Fetched list from API:', results)

    const fullDetails = await Promise.all(
      results.map(async ({ name, url }) => {
        const cacheKey = `pokemon:${name}`
        const cachedPokemon = await redis.get(cacheKey)

        if (cachedPokemon) return JSON.parse(cachedPokemon)

        const { data: pokemonData } = await axios.get<PokemonDetails>(url)
        const transformedPokemonData = transformOne(pokemonData)
        await redis.set(
          cacheKey,
          JSON.stringify(transformedPokemonData),
          'EX',
          CACHE_TTL,
        )
        return transformedPokemonData
      }),
    )

    const response: PokemonList = {
      count: data.count,
      next: !!data.next,
      previous: !!data.previous,
      results: fullDetails,
    }

    await redis.set(listCacheKey, JSON.stringify(response), 'EX', CACHE_TTL)
    return response
  } catch {
    return Promise.reject(genericErrorMessage)
  }
}

export async function findOne(name: string) {
  const cacheKey = `pokemon:${name}`

  try {
    const cached = await redis.get(cacheKey)

    if (cached) {
      return JSON.parse(cached) as PokemonDetails
    }

    const { data } = await axios.get<PokemonDetails>(`${POKE_API_URL}/${name}`)

    await redis.set(cacheKey, JSON.stringify(data), 'EX', CACHE_TTL)

    return data
  } catch {
    return Promise.reject(genericErrorMessage)
  }
}
