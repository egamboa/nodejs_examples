import { Request, Response } from 'express'
import { AuthRequest } from '../interfaces/AuthRequest'
import { loginUser, registerUser } from '../services/auth.service'

export async function register(req: Request, res: Response) {
  const { email, password } = req.body
  registerUser(email, password)
    .then((user) => {
      res.status(201).json({ id: user.id, email: user.email })
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Failed to register user' })
    })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  loginUser(email, password)
    .then((user) => {
      res.json({ token: user.token })
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Failed to login' })
    })
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  res.json({ user: req.user }) // returns decoded jwt token payload
}
