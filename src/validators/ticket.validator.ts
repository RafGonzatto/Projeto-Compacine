import { z } from 'zod';

const ticketSchema = z.object({
  id: z.number().optional(),  
  session_id: z.number(),
  chair: z.string(),
  value: z.number().positive(),  
});



export { ticketSchema }