import { Movie } from 'models/movie.model'
interface IMovieRepository {
  listMovies(): Promise<Movie[]>
}
export default IMovieRepository
