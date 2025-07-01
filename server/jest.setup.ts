import dotenv from 'dotenv'
dotenv.config()

jest.mock('./src/config/redis', () => {
  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    exists: jest.fn(),
    on: jest.fn(),
  }
  return { redis: mockRedis }
})

jest.mock('axios')
