import { Request, Response } from 'express'
import * as AuthService from '../../services/auth.service'
import { register, login, getCurrentUser } from '../auth.controller'
import { AuthRequest } from '../../interfaces/AuthRequest'

jest.mock('../../services/auth.service')

describe('Auth Controller', () => {
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register user and return id/email', async () => {
      const mockUser = { id: 1, email: 'test@example.com' }
      ;(AuthService.registerUser as jest.Mock).mockResolvedValue(mockUser)

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      } as Request

      const res = mockResponse()

      await register(req, res)

      expect(AuthService.registerUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      )
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        email: 'test@example.com',
      })
    })

    it('should handle registration errors', async () => {
      const error = new Error('Email already used') as Error & {
        status?: number
      }
      error.status = 400
      ;(AuthService.registerUser as jest.Mock).mockRejectedValue(error)

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      } as Request

      const res = mockResponse()

      await register(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already used' })
    })
  })

  describe('login', () => {
    it('should return token on success', async () => {
      const mockLoginResult = { token: 'fake-jwt-token' }
      ;(AuthService.loginUser as jest.Mock).mockResolvedValue(mockLoginResult)

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      } as Request

      const res = mockResponse()

      await login(req, res)

      expect(AuthService.loginUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      )
      expect(res.json).toHaveBeenCalledWith({ token: 'fake-jwt-token' })
    })

    it('should handle login errors', async () => {
      const error = new Error('Invalid credentials') as Error & {
        status?: number
      }
      error.status = 401
      ;(AuthService.loginUser as jest.Mock).mockRejectedValue(error)

      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword',
        },
      } as Request

      const res = mockResponse()

      await login(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' })
    })
  })

  describe('getCurrentUser', () => {
    it('should return user from request', async () => {
      const req = {
        user: { id: 1, email: 'test@example.com' },
      } as unknown as AuthRequest

      const res = mockResponse()

      await getCurrentUser(req, res)

      expect(res.json).toHaveBeenCalledWith({
        user: { id: 1, email: 'test@example.com' },
      })
    })

    it('should return 401 if no user', async () => {
      const req = {} as AuthRequest
      const res = mockResponse()

      await getCurrentUser(req, res)

      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' })
    })
  })
})
