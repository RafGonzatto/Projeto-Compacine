import { Request, Response, NextFunction } from 'express'
import { ticketSchema } from '../validators/ticket.validator'
export const ticketMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { session_id, chair, value } = req.body

  const validation = ticketSchema.safeParse({
    session_id: session_id,
    chair: chair,
    value: value,
  })

  if (!validation.success) {
    const exampleTicket = {
      session_id: 1,
      chair: 'b1',
      value: 10,
    }
    const errorMessages = validation.error.errors.map(
      (error: { message: any }) => error.message,
    )
    const errorMessage = errorMessages.join(', ')
    return res
      .status(400)
      .json({ code: 400, error: errorMessage, exampleTicket })
  }
  next()
}
