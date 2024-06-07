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

  async getMovieById(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const movie = await service.getMovieById(Number(req.params.id))
      return res.status(200).json(movie)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }

  async updateMovie(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const movie = await service.updateMovie(Number(req.params.id), req.body)
      return res.status(200).json(movie)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }

  async createMovie(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const newMovie = await service.createMovie(req.body)
      return res.status(200).json(newMovie)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        console.error('Error creating a movie:', error)
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }

  async deleteMovie(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      await service.deleteMovie(Number(req.params.id))
      // eslint-disable-next-line prettier/prettier
      return res.status(200).json({ "message": "movie removed successfully" })
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        console.error('Error deletion of movie:', error)
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }
}

export default MovieController
