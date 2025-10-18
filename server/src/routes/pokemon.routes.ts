import { Router, Request, Response } from 'express'
import { getAllPokemons, getPokemon } from '../controllers/pokemon.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

router.get('/', verifyToken, async (req: Request, res: Response) => {
  await getAllPokemons(req, res)
}) // 👈 GET /pokemon
router.get('/:name', verifyToken, async (req: Request, res: Response) => {
  await getPokemon(req, res)
}) // 👈 GET /pokemon/:name

export default router
