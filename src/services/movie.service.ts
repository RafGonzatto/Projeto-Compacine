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
}
export default MovieService
