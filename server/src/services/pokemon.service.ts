import axios from 'axios'
import { redis } from '../config/redis'
import { PokemonList, PokemonDetails } from '../interfaces/Pokemon'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'
const CACHE_TTL = 3600 // 1 hour

const genericErrorMessage = {
  status: 500,
  message: 'Server error, please try again later',
}

function isAxiosError(error: unknown): error is {
  isAxiosError: boolean
  response?: { status?: number; statusText?: string }
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as Record<string, unknown>).isAxiosError === true
  )
}
export async function list(limit: number, offset: number) {
  try {
    const listCacheKey = `pokemon:list:limit=${limit}:offset=${offset}`

    // Check if full list is already cached
    const cachedList = await redis.get(listCacheKey)
    if (cachedList) {
      return JSON.parse(cachedList)
    }

    // Fetch list of Pokémon names + URLs
    const { data } = await axios.get<PokemonList>(
      `${POKE_API_URL}?limit=${limit}&offset=${offset}`,
    )

    const results = data.results as { name: string; url: string }[]

    // For each result, check Redis cache or fetch and cache details
    const fullDetails = await Promise.all(
      results.map(async ({ name, url }) => {
        const cacheKey = `pokemon:${name}`

        const cachedPokemon = await redis.get(cacheKey)
        if (cachedPokemon) return cachedPokemon

        const { data: pokemonData } = await axios.get<PokemonDetails>(url)
        const {
          id,
          name: cleanName,
          height,
          weight,
          base_experience,
          abilities,
          types,
          sprites,
        } = pokemonData

        const cleanedData: PokemonDetails = {
          id,
          name: cleanName,
          height,
          weight,
          base_experience,
          abilities,
          types,
          sprites,
        }
        await redis.set(cacheKey, JSON.stringify(cleanedData), 'EX', CACHE_TTL)
        return cleanedData
      }),
    )

    // Cache the full hydrated list for future use
    await redis.set(listCacheKey, JSON.stringify(fullDetails), 'EX', CACHE_TTL)
    return fullDetails
  } catch (error) {
    console.error(error)
    if (isAxiosError(error)) {
      Promise.reject({
        status: error.response?.status || 500,
        message: error.response?.statusText || 'Error fetching Pokémon data',
      })
    }

    Promise.reject(genericErrorMessage)
    return
  }
}

export async function findOne(name: string) {
  const cacheKey = `pokemon:${name}`

  try {
    // Check Redis cache
    const cached = await redis.get(cacheKey)

    if (cached) {
      return JSON.parse(cached) as PokemonDetails
    }
    // Fetch from PokéAPI
    const { data } = await axios.get<PokemonDetails>(`${POKE_API_URL}/${name}`)

    const {
      id,
      name: cleanName,
      height,
      weight,
      base_experience,
      abilities,
      types,
      sprites,
    } = data

    const cleanedData: PokemonDetails = {
      id,
      name: cleanName,
      height,
      weight,
      base_experience,
      abilities,
      types,
      sprites,
    }

    // Cache result
    await redis.set(cacheKey, JSON.stringify(cleanedData), 'EX', CACHE_TTL)

    return cleanedData
  } catch (error) {
    console.error(error)
    if (isAxiosError(error)) {
      Promise.reject({
        status: error.response?.status || 500,
        message: error.response?.statusText || 'Error fetching Pokémon data',
      })
    }

    Promise.reject(genericErrorMessage)
    return
  }
}
