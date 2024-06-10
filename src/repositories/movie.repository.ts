import { Repository } from 'typeorm'
import { IMovie } from '../interfaces/movie.interface'
import { Movie } from '../models/movie.model'
import AppDataSource from '../database/connection'
import IMovieRepository from '../repositories.interfaces/movie.repository.interface'

class MovieRepository implements IMovieRepository {
  private repository: Repository<Movie>

  constructor() {
    this.repository = AppDataSource.getRepository(Movie)
  }

  async listMovies() {
    return this.repository.find({ relations: ['sessions'] })
  }

  async getMovieById(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['sessions'] })
  }

  async getMovieByName(name: string) {
    return this.repository.findOne({ where: { name } })
  }

  async updateMovie(id: number, movie: IMovie) {
    const Movie = await this.getMovieById(id)
    if (!Movie) return null
    else {
      await this.repository.update(Movie.id, movie)
      return await this.getMovieByName(movie.name)
    }
  }

  async createMovie(movieData: IMovie) {
    const newMovie = await this.repository.create(movieData)
    await this.repository.save(newMovie)
    return newMovie
  }

  async deleteMovie(id: number) {
    await this.repository.delete({ id })
  }
}

export default MovieRepository
