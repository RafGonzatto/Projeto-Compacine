import { Movie } from 'models/movie.model'
import { IMovie } from 'interfaces/movie.interface'
interface IMovieRepository {
  listMovies(): Promise<Movie[]>
  getMovieById(id: number): Promise<Movie | null>
  updateMovie(id: number, movie: IMovie): Promise<Movie | null>
}
export default IMovieRepository
