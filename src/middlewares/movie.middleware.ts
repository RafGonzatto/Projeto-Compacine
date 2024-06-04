import { Request, Response, NextFunction } from 'express'
import { movieSchema } from '../validators/movie.validator'

export const movieMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    ////////////
  } = req.body

  const validation = movieSchema.safeParse({
    ///////////
  })

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((error) => error.message)
    const errorMessage = errorMessages.join(', ')
    return res.status(400).json({ error: errorMessage })
  }

  next()
}
