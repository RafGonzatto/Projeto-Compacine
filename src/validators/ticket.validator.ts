import { z } from 'zod'

const createParamsSchema = z.object({
  movie_id: z.string().transform((val) => parseInt(val, 10)),
  session_id: z.string().transform((val) => parseInt(val, 10)),
})

const updateParamsSchema = z.object({
  movie_id: z.string().transform((val) => parseInt(val, 10)),
  session_id: z.string().transform((val) => parseInt(val, 10)),
  id: z.string().transform((val) => parseInt(val, 10)),
})

const ticketSchema = z.object({
  id: z.number().optional(),
  session_id: z.number(),
  chair: z.string(),
  value: z.number().positive(),
})

export { createParamsSchema, updateParamsSchema, ticketSchema }
