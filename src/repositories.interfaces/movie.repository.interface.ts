import { Movie } from 'entitys/movie.entity'
import { IMovie } from 'interfaces/movie.interface'
interface IMovieRepository {
  listMovies(): Promise<Movie[]>
  getMovieById(id: number): Promise<Movie | null>
  getMovieByName(name: string): Promise<Movie | null>
  updateMovie(id: number, movie: IMovie): Promise<Movie | null>
  createMovie(movieData: IMovie): Promise<Movie | null>
  deleteMovie(id: number): Promise<void>
}
export default IMovieRepository
