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
    return this.repository.find()
  }

  async getMovieById(id: number) {
    return this.repository.findOne({ where: { id } })
  }
}
export default MovieRepository
