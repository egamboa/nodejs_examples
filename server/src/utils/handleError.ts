import { Response } from 'express'

interface ErrorWithStatus {
  status?: number
  message?: string
}

export function handleError(
  res: Response,
  err: unknown,
  defaultStatus: number,
  defaultMessage: string,
) {
  const error = err as ErrorWithStatus

  const status =
    error && typeof error.status === 'number' ? error.status : defaultStatus
  const message =
    error && typeof error.message === 'string' && error.message !== ''
      ? error.message
      : defaultMessage

  return res.status(status).json({ error: message })
}
