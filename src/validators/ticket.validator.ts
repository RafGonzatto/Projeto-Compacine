import { z } from 'zod';

const ticketSchema = z.object({
  id: z.number().optional(),  
  session_id: z.number(),
  chair: z.string(),
  value: z.number().positive(),  
});

const exampleTicket = {
  session_id: 1,
  chair: 'b1',
  value: 10,
};

try {
  ticketSchema.parse(exampleTicket);
  console.log('O objeto é válido!');
} catch (e) {
  console.error('Erro de validação:', e);
}
export { ticketSchema }