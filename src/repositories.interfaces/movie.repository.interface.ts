import { Movie } from 'models/movie.model'
interface IMovieRepository {
  listMovies(): Promise<Movie[]>
  getMovieById(id: number): Promise<Movie | null>
}
export default IMovieRepository
