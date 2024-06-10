import { Request, Response, NextFunction } from 'express'
import {
  createTicket,
  updateTicket,
} from '../validators/ticket.validator'
import { ZodSchema } from 'zod'

const validateCreate =
  (paramsSchema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
   
    console.log("CREATE")
    
    const { session_id } = req.params
    const { chair, value } = req.body
    const data = { session_id: parseInt(session_id), chair, value }
      const bodyValidation = paramsSchema.safeParse(data)
      if (!bodyValidation.success) {
        const errorMessages = bodyValidation.error.errors.map(
          (error) => error.message,
        )
        const exampleTicket = {
          session_id: 1,
          chair: 'b1',
          value: 10,
        }
        return res
          .status(400)
          .json({ code: 400, error: errorMessages.join(', '), exampleTicket })
      }
      req.body = bodyValidation.data
    
    next()
  }
  const validateUpdate =
  (paramsSchema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { id, session_id } = req.params
    const { chair, value } = req.body
    const data = { id: parseInt(id), session_id: parseInt(session_id), chair, value };
    
    console.log(data)
      const bodyValidation = paramsSchema.safeParse(data)
      if (!bodyValidation.success) {
        const errorMessages = bodyValidation.error.errors.map(
          (error) => error.message,
        )
        const exampleUrl = {
          url: 'http://localhost:3000/api/v1/movies/1/sessions/1/tickets/1 ',
        }
        const exampleTicket = {
          chair: 'b1',
          value: 10,
        }
        return res
          .status(400)
          .json({ code: 400, error: errorMessages.join(', '), exampleTicket, exampleUrl })
      }
      req.body = bodyValidation.data
    
    next()
  }

export const createTicketMiddleware = validateCreate(createTicket)
export const updateTicketMiddleware = validateUpdate(updateTicket)
