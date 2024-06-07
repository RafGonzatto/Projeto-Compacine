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

export { movieSchema }
