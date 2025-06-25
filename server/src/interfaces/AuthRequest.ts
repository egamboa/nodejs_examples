import jwt from 'jsonwebtoken'
import { Request } from 'express'

export interface AuthRequest extends Request {
  user?: jwt.JwtPayload
}
