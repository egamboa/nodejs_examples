import { Router } from 'express'
import { register, login, getCurrentUser } from '../controllers/auth.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// 👍🏼 public routes

router.post('/register', register)
router.post('/login', login)

// ✋🏼 protected routes

router.get('/me', verifyToken, getCurrentUser)

export default router
