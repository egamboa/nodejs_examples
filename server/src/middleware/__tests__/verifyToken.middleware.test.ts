import { verifyToken } from '../auth.middleware'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../../interfaces/AuthRequest'
import { Response, NextFunction } from 'express'

jest.mock('jsonwebtoken')
const mockedJwt = jwt as jest.Mocked<typeof jwt>

describe('verifyToken middleware', () => {
  let req: Partial<AuthRequest>
  let res: Partial<Response>
  let next: NextFunction

  beforeEach(() => {
    req = {
      headers: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    next = jest.fn()
    jest.clearAllMocks()
  })

  it('should return 401 if no authorization header is provided', () => {
    verifyToken(req as AuthRequest, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if authorization header does not start with "Bearer "', () => {
    req.headers = { authorization: 'InvalidToken' }

    verifyToken(req as AuthRequest, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 403 if token is invalid or expired', () => {
    req.headers = { authorization: 'Bearer bad.token.here' }
    mockedJwt.verify.mockImplementation(() => {
      throw new Error('Invalid token')
    })

    verifyToken(req as AuthRequest, res as Response, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid or expired token',
      systemError: expect.any(Error),
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('should attach user to request and call next if token is valid', () => {
    const fakeUser = { id: 1, email: 'ash@poke.com' }
    req.headers = { authorization: 'Bearer valid.token' }

    mockedJwt.verify.mockImplementation(() => fakeUser)

    verifyToken(req as AuthRequest, res as Response, next)

    expect(req.user).toEqual(fakeUser)
    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
