import { Router } from 'express'
import { getAllPokemons, getPokemon } from '../controllers/pokemon.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

router.get('/', verifyToken, getAllPokemons) // 👈 GET /pokemon
router.get('/:name', verifyToken, getPokemon) // 👈 GET /pokemon/:name

export default router
