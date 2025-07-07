import { Request, Response } from 'express'
import {
  list as listPokemons,
  findOne as findOnePokemon,
} from '../services/pokemon.service'
import {
  transformCollection as pokemonsTransformCollection,
  transformOne as pokemonsTransformOne,
} from '../transformers/pokemon.transformer'

import { handleError } from '../utils/handleError'

export async function getAllPokemons(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0

  try {
    const payload = await listPokemons(limit, offset)
    payload.results = pokemonsTransformCollection(payload.results)
    res.status(200).json(payload)
  } catch (err) {
    return handleError(res, err, 500, 'Failed to fetch pokemons')
  }
}

export async function getPokemon(req: Request, res: Response) {
  const name = req.params.name?.toLowerCase()
  if (!name) {
    return handleError(res, null, 400, 'Pokemon name is required')
  }
  try {
    const pokemon = await findOnePokemon(name)
    if (!pokemon) {
      return handleError(res, null, 404, 'Pokemon not found')
    }
    res.status(200).json(pokemonsTransformOne(pokemon))
  } catch (err) {
    return handleError(res, err, 500, 'Failed to fetch Pokemon data')
  }
}
