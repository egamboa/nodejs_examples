import { Request, Response } from 'express'
import {
  list as listPokemons,
  findOne as findOnePokemon,
} from '../services/pokemon.service'
import {
  transformCollection as pokemonsTransformCollection,
  transformOne as pokemonsTransformOne,
} from '../transformers/pokemon.transformer'

export async function getAllPokemons(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0

  try {
    const pokemons = await listPokemons(limit, offset)
    res.status(200).json(pokemonsTransformCollection(pokemons))
  } catch (err) {
    const error = err as { status?: number; message?: string }
    res
      .status(error.status || 500)
      .json({ error: error.message || 'Failed to fetch pokemons' })
  }
}

export async function getPokemon(req: Request, res: Response) {
  const name = req.params.name?.toLowerCase()
  try {
    const pokemon = await findOnePokemon(name)
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' })
    }
    res.status(200).json(pokemonsTransformOne(pokemon))
  } catch (err) {
    const error = err as { status?: number; message?: string }
    res
      .status(error.status || 500)
      .json({ error: error.message || 'Failed to fetch Pokemon data' })
  }
}
