import { Request, Response } from 'express'
import MovieService from '../services/movie.service'
import { container } from 'tsyringe'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

class MovieController {
  async listMovies(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const movies = await service.listMovies()

      const formattedMovie = movies.map((movie) => ({
        ...movie,
        release_date: format(new Date(movie.release_date), 'dd/MM/yyyy ', {
          locale: ptBR,
        }),
      }))
      return res.status(200).json(formattedMovie)
    } catch (error) {
      return res.status(500).json({ error: 'Error while listing movies' })
    }
  }

  async getMovieById(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      const movie = await service.getMovieById(Number(req.params.id))

      const formattedMovie = {
        ...movie,
        release_date: format(new Date(movie.release_date), 'dd/MM/yyyy ', {
          locale: ptBR,
        }),
      }

      return res.status(200).json(formattedMovie)
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

      const formattedMovie = {
        ...movie,
        release_date: format(new Date(movie.release_date), 'dd/MM/yyyy ', {
          locale: ptBR,
        }),
      }
      return res.status(200).json(formattedMovie)
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
      const movieData = req.body
      const service = container.resolve(MovieService)
      const newMovie = await service.createMovie(movieData)

      const formattedMovie = {
        ...newMovie,
        release_date: format(new Date(movieData.release_date), 'dd/MM/yyyy ', {
          locale: ptBR,
        }),
      }
      return res.status(200).json(formattedMovie)
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

  async deleteMovie(req: Request, res: Response) {
    try {
      const service = container.resolve(MovieService)
      await service.deleteMovie(Number(req.params.id))
      // eslint-disable-next-line prettier/prettier
      return res.status(200).json({ message: 'movie removed successfully' })
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
}

export default MovieController
