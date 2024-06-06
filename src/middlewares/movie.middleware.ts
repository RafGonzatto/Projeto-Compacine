import { Request, Response, NextFunction } from 'express'
import { movieSchema } from '../validators/movie.validator'

export const movieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { image, name, description, actors, genre, release_date } = req.body
  const id = Number(req.params.id)

  const validation = movieSchema.safeParse({
    id: id,
    image: image,
    name: name,
    description: description,
    actors: actors,
    genre: genre,
    release_date: release_date,
  })

  if (!validation.success) {
    const exampleTicket = {
      id: 1,
      image: 'https://www.example.com/image.jpg',
      name: 'Movie Name',
      description: 'Movie description',
      actors: ['Actor 1', 'Actor 2'],
      genre: 'Action',
      release_date: '2021-01-01',
    }
    const errorMessages = validation.error.errors.map(
      (error: { message: any }) => error.message,
    )
    const errorMessage = errorMessages.join(', ')
    return res
      .status(400)
      .json({ code: 400, error: errorMessage, exampleTicket })
  }
  next()
}
