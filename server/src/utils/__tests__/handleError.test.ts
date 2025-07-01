import { Response } from 'express'
import { handleError } from '../handleError'

describe('handleError utility', () => {
  let res: Partial<Response>

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it('should use provided status and message from error object', () => {
    const err = { status: 400, message: 'Bad request' }
    handleError(res as Response, err, 500, 'Default error')

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad request' })
  })

  it('should fallback to default status if error.status is not a number', () => {
    const err = { status: 'not-a-number', message: 'Custom message' }
    handleError(res as Response, err, 500, 'Default error')

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Custom message' })
  })

  it('should fallback to default message if error.message is not a string', () => {
    const err = { status: 401, message: 12345 }
    handleError(res as Response, err, 500, 'Default error')

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Default error' })
  })

  it('should use default status and message if error is not an object', () => {
    handleError(res as Response, 'string error', 500, 'Default error')

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Default error' })
  })

  it('should use default status and message if error is null', () => {
    handleError(res as Response, null, 500, 'Default error')

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Default error' })
  })
})
