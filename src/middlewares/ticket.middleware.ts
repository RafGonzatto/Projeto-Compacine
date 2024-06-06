import { Request, Response, NextFunction } from 'express'
import { ticketSchema } from '../validators/ticket.validator'
export const ticketMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    ////////////
  } = req.body

  const validation = ticketSchema.safeParse({
    ///////////
  })

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((error: { message: any }) => error.message)
    const errorMessage = errorMessages.join(', ')
    return res.status(400).json({ error: errorMessage })
  }

  next()
}
