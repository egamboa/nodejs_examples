import * as AuthService from '../auth.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../models/User'

jest.mock('../../models/User')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const email = 'test@example.com'
      const password = 'password123'
      const hashedPassword = 'hashedPassword'

      ;(User.findOne as jest.Mock).mockResolvedValue(null)
      ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword)
      const createdUser = { id: 1, email, password_hash: hashedPassword }
      ;(User.create as jest.Mock).mockResolvedValue(createdUser)

      const result = await AuthService.registerUser(email, password)

      expect(User.findOne).toHaveBeenCalledWith({ where: { email } })
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10)
      expect(User.create).toHaveBeenCalledWith({
        email,
        password_hash: hashedPassword,
      })
      expect(result).toEqual(createdUser)
    })

    it('should reject if email already exists', async () => {
      const email = 'test@example.com'
      const password = 'password123'
      const existingUser = { id: 1, email, password_hash: 'existingHash' }

      ;(User.findOne as jest.Mock).mockResolvedValue(existingUser)

      await expect(AuthService.registerUser(email, password)).rejects.toEqual({
        status: 400,
        message: 'Email already in use',
      })
    })

    it('should reject on error', async () => {
      ;(User.findOne as jest.Mock).mockRejectedValue(new Error('DB error123'))

      await expect(
        AuthService.registerUser('error@example.com', 'pass'),
      ).rejects.toEqual({
        status: 500,
        message: 'Server error, please try again later',
      })
    })
  })

  describe('loginUser', () => {
    const email = 'test@example.com'
    const password = 'password123'
    const userMock = {
      id: 1,
      email,
      password_hash: 'hashedPassword',
      role: 'user',
    }

    it('should log in and return token', async () => {
      const token = 'mockToken'

      ;(User.findOne as jest.Mock).mockResolvedValue(userMock)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)
      ;(jwt.sign as jest.Mock).mockReturnValue(token)

      const result = await AuthService.loginUser(email, password)

      expect(User.findOne).toHaveBeenCalledWith({ where: { email } })
      expect(bcrypt.compare).toHaveBeenCalledWith(
        password,
        userMock.password_hash,
      )
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: userMock.id, email: userMock.email, role: userMock.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      )
      expect(result).toEqual({ user: userMock, token })
    })

    it('should reject if user is not found', async () => {
      ;(User.findOne as jest.Mock).mockResolvedValue(null)

      await expect(AuthService.loginUser(email, password)).rejects.toEqual({
        status: 401,
        message: 'Invalid credentials',
      })
    })

    it('should reject if password does not match', async () => {
      ;(User.findOne as jest.Mock).mockResolvedValue(userMock)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      await expect(AuthService.loginUser(email, password)).rejects.toEqual({
        status: 401,
        message: 'Invalid credentials',
      })
    })

    it('should reject on error', async () => {
      ;(User.findOne as jest.Mock).mockRejectedValue(new Error('Unexpected'))

      await expect(AuthService.loginUser(email, password)).rejects.toEqual({
        status: 500,
        message: 'Server error, please try again later',
      })
    })
  })
})
