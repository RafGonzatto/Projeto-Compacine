import { Request, Response } from 'express'
import MovieService from '../services/movie.service'
import { container } from 'tsyringe'

class MovieController {
  async listMovies(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const movies = await service.listMovies()
      return res.status(200).json(movies)
    } catch (error) {
      console.error('Error while listing movies:', error)
      return res.status(500).json({ error: 'Error while listing movies' })
    }
  }
}

export default MovieController
