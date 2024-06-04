import { z } from 'zod'

const movieSchema = z.object({
  id: z.number().optional(),
  image: z
    .string()
    .url('URL da imagem inválida')
    .nonempty('Imagem é obrigatória'),
  name: z.string().nonempty('Nome é obrigatório'),
  description: z
    .string()
    .max(100, 'A descrição do filme não pode exceder 100 caracteres')
    .nonempty('Descrição é obrigatória'),
  actors: z
    .array(z.string().nonempty('Ator não pode ser vazio'))
    .nonempty('Pelo menos um ator é obrigatório'),
  genre: z.string().nonempty('Gênero é obrigatório'),
  release_date: z.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg)
      }
    },
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: 'Data de lançamento inválida',
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
