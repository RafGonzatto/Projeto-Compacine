import { container } from 'tsyringe'
import IMovieRepository from './repositories.interfaces/movie.repository.interface'
import MovieRepository from './repositories/movie.repository'
import { ITicketRepository } from './repositories.interfaces/ticket.repository.interface'
import TicketRepository from './repositories/ticket.repository'

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository,
)
container.registerSingleton<ITicketRepository>(
  'TicketRepository',
  TicketRepository,
)
