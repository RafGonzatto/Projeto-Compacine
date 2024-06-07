import { IMovie } from '../interfaces/movie.interface'
import IMovieRepository from '../repositories.interfaces/movie.repository.interface'
import createError from 'http-errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class MovieService {
  constructor(
    @inject('MovieRepository')
    private movieRepository: IMovieRepository,
  ) {}

  async listMovies() {
    const movies = await this.movieRepository.listMovies()
    return movies
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.getMovieById(id)
    if (!movie) throw createError(404, 'Movie not found')
    return movie
  }

  async updateMovie(id: number, movieData: IMovie) {
    const updatedMovie = await this.movieRepository.updateMovie(id, movieData)
    if (!updatedMovie) throw createError(404, 'Movie not found')
    return updatedMovie
  }

  async createMovie(movieData: IMovie) {
    const movieExist = await this.movieRepository.getMovieByName(movieData.name)
    //Não é possivel cadastrar o mesmo filme duas vezes
    if (!movieExist) {
      const newMovie = await this.movieRepository.createMovie(movieData)
      return newMovie
    } else {
      throw new createError.Conflict(
        'It is not possible to register, the film already exists',
      )
    }
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.getMovieById(id)
    if (!movie) {
      throw new createError.NotFound('Movie not found')
    } else {
      await this.movieRepository.deleteMovie(id)
    }
  }
}
export default MovieService
