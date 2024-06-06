import { z } from 'zod'

const movieSchema = z.object({
  id: z.number().optional(),
  image: z.string().url('Invalid image URL').nonempty('Image URL is required'),
  name: z.string().nonempty('Name is required'),
  description: z
    .string()
    .max(100, 'The description must have at most 100 characters')
    .nonempty('Descption is required'),
  actors: z
    .array(z.string().nonempty('Actor name is required'))
    .nonempty('At least one actor is required'),
  genre: z.string().nonempty('Genre is required'),
  release_date: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg)
      }
    },
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: 'Date format is invalid',
    }),
  ),
  sessions: z.array(z.any()).optional(),
})

// Exemplo de uso do esquema de validação
const movieData = {
  id: 1,
  image: 'url_da_imagem',
  name: 'nome_do_filme',
  description: 'descricao_do_filme',
  actors: ['ator1', 'ator2', 'ator3'],
  genre: 'genero_do_filme',
  release_date: '2024-06-03T00:00:00.000Z',
  sessions: [],
}

try {
  movieSchema.parse(movieData)
  console.log('Dados do filme válidos!')
} catch (e) {
  console.error('Erro de validação:', e)
}

export { movieSchema }
