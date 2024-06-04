import { container } from 'tsyringe'
import IMovieRepository from './repositories.interfaces/movie.repository.interface'
import MovieRepository from './repositories/movie.repository'

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository,
)
