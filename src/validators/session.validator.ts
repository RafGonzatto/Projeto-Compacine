import { z } from 'zod'

const sessionSchema = z.object({
  room: z.string(),
  capacity: z.number(),
  day: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
  time: z.string().time(),
})

const exampleSession = {
  room: 'nome_da_sala',
  capacity: 100,
  day: '03/06/2024',
  time: '14:23:00',
}

try {
  sessionSchema.parse(exampleSession)
  console.log('O objeto é válido!')
} catch (error) {
  console.error('Erro de validação:', error)
}

export { sessionSchema }
