import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserAttributes from '../interfaces/User'
import { User } from '../models/User'

const SALT_ROUNDS = 10

const loginErrorMessage = { status: 401, message: 'Invalid credentials' }
const registrationErrorMessage = {
  status: 400,
  message: 'Email already in use',
}
const genericErrorMessage = {
  status: 500,
  message: 'Server error, please try again later',
}

export async function registerUser(
  email: string,
  password: string,
): Promise<UserAttributes> {
  try {
    const existing = await User.findOne({ where: { email } })
    if (existing) {
      return Promise.reject(registrationErrorMessage)
    }
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS)
    return await User.create({ email, password_hash })
  } catch {
    return Promise.reject(genericErrorMessage)
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: UserAttributes; token: string }> {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return Promise.reject(loginErrorMessage)
    }
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return Promise.reject(loginErrorMessage)
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
    )
    return { user, token }
  } catch {
    return Promise.reject(genericErrorMessage)
  }
}
