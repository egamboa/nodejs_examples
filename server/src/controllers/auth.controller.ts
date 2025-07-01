import { Request, Response } from 'express'
import { AuthRequest } from '../interfaces/AuthRequest'
import { loginUser, registerUser } from '../services/auth.service'
import { handleError } from '../utils/handleError'

const emailAndPasswordRequired = {
  status: 400,
  message: 'Email and password are required',
}

const failedRegistration = {
  status: 500,
  message: 'Failed to register user',
}

const failedLogin = {
  status: 500,
  message: 'Failed to login user',
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) {
    return handleError(
      res,
      emailAndPasswordRequired,
      failedRegistration.status,
      failedRegistration.message,
    )
  }
  try {
    const user = await registerUser(email, password)
    res.status(201).json({ id: user.id, email: user.email })
  } catch (err) {
    return handleError(
      res,
      err,
      failedRegistration.status,
      failedRegistration.message,
    )
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) {
    return handleError(
      res,
      emailAndPasswordRequired,
      failedLogin.status,
      failedLogin.message,
    )
  }
  try {
    const user = await loginUser(email, password)
    res.json({ token: user.token })
  } catch (err) {
    return handleError(res, err, failedLogin.status, failedLogin.message)
  }
}

export async function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  res.json({ user: req.user }) // returns decoded jwt token payload
}
