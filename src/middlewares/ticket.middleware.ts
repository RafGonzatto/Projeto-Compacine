import { Request, Response, NextFunction } from 'express'
import {
  createParamsSchema,
  ticketSchema,
  updateParamsSchema,
} from 'validators/ticket.validator'
import { ZodSchema } from 'zod'

const validate =
  (paramsSchema: ZodSchema | null, bodySchema: ZodSchema | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (paramsSchema) {
      const paramsValidation = paramsSchema.safeParse(req.params)
      if (!paramsValidation.success) {
        const errorMessages = paramsValidation.error.errors.map(
          (error) => error.message,
        )
        return res
          .status(400)
          .json({ code: 400, error: errorMessages.join(', ') })
      }
      req.params = paramsValidation.data
    }

    if (bodySchema) {
      const bodyValidation = bodySchema.safeParse(req.body)
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
    }

    next()
  }

export const createTicketMiddleware = validate(createParamsSchema, ticketSchema)
export const updateTicketMiddleware = validate(updateParamsSchema, ticketSchema)
