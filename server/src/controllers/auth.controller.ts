import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { AuthRequest } from '../middleware/auth.middleware'

const SALT_ROUNDS = 10

export async function register(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const existing = await User.findOne({ where: { email } })
    if (existing) {
      res.status(400).json({
        error: 'Email already in use',
      })
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ email, password_hash })

    res.status(201).json({ id: user.id, email: user.email })
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user', systemError: err })
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: 'Failed to login', systemError: err })
  }
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  res.json({ user: req.user }) // returns decoded token payload
}
