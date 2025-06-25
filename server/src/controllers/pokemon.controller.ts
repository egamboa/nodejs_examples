import { Request, Response } from 'express'
import {
  list as listPokemons,
  findOne as findOnePokemon,
} from '../services/pokemon.service'

export async function getAllPokemons(req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string) || 20
  const offset = parseInt(req.query.offset as string) || 0
  listPokemons(limit, offset)
    .then((pokemons) => {
      res.status(200).json(pokemons)
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Failed to register user' })
    })
}

export async function getPokemon(req: Request, res: Response) {
  const name = req.params.name?.toLowerCase()

  findOnePokemon(name)
    .then((pokemon) => {
      if (!pokemon) {
        res.status(404).json({ error: 'Pokemon not found' })
        return
      }
      res.status(200).json(pokemon)
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Failed to fetch Pokemon data' })
    })
}
