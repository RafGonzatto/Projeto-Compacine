import { z } from 'zod'


const createTicket = z.object({
  session_id: z.number().positive(),
  chair: z.string(),
  value: z.number().positive(),
})
const updateTicket = z.object({
  id: z.number().positive(),
  session_id: z.number().positive(),
  chair: z.string(),
  value: z.number().positive(),
})

export { updateTicket, createTicket }
