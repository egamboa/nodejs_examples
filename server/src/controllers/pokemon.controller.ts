import { Request, Response } from 'express'
import axios from 'axios'
import { redis } from '../config/redis'

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'
const CACHE_TTL = 3600 // 1 hour

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

export async function getAllPokemons(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0
  const cacheKey = `pokemon:all:limit=${limit}:offset=${offset}`

  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      res.status(200).json(JSON.parse(cached))
      return
    }

    const { data } = await axios.get(
      `${POKE_API_URL}?limit=${limit}&offset=${offset}`,
    )

    await redis.set(cacheKey, JSON.stringify(data), 'EX', CACHE_TTL)

    res.status(200).json(data)
    return
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: error.response?.statusText || 'Unknown Axios error',
      })
      return
    }

    console.error(error)
    res.status(500).json({ error: 'Failed to fetch Pokémon list' })
    return
  }
}

export async function getPokemon(req: Request, res: Response) {
  const name = req.params.name?.toLowerCase()

  if (!name) {
    res.status(400).json({ error: 'Pokemon name is required' })
    return
  }

  const cacheKey = `pokemon:${name}`

  try {
    // Check Redis cache
    const cached = await redis.get(cacheKey)
    if (cached) {
      res.status(200).json(JSON.parse(cached))
      return
    }

    // Fetch from PokéAPI
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    )

    // Cache result
    await redis.set(cacheKey, JSON.stringify(data), 'EX', CACHE_TTL)

    res.status(200).json(data)
    return
  } catch (error) {
    if (isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: error.response?.statusText || 'Unknown Axios error',
      })
      return
    }

    console.error(error)
    res.status(500).json({ error: 'Failed to fetch Pokemon data' })
    return
  }
}
