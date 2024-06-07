import { Router } from 'express'
import { container } from 'tsyringe'
import MovieController from '../controllers/movie.controller'
import { movieMiddleware } from '../middlewares/movie.middleware'

const router = Router()
const movieController = container.resolve(MovieController)
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints related to movies
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - image
 *         - name
 *         - description
 *         - actors
 *         - genre
 *         - release_date
 *       properties:
 *         image:
 *           type: string
 *           description: The url for the movie image
 *           example: 'https://www.example.com/image.jpg'
 *         name:
 *           type: string
 *           description: The movie name
 *           example: 'Movie Name'
 *         description:
 *           type: string
 *           description: The movie description
 *           example: 'Movie description'
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *           description: The movie actors
 *           example: ['Actor 1', 'Actor 2']
 *         genre:
 *           type: string
 *           description: The movie genre
 *           example: 'Action'
 *         release_date:
 *           type: string
 *           format: date-time
 *           description: The movie release date
 *           example: '2021-01-01'
 */
/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Lists all movies
 *     tags: [Movies]
 *     responses:
 *       '200':
 *         description: Returns a list of all movies.
 *       '500':
 *         description: Error while listening movies.
 * /api/v1/movies/{id}:
 *   get:
 *     summary: Get a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Returns a movie by id.
 *       '404':
 *         description: Movie not found.
 *       '500':
 *         description: Error while getting movie.
 *   put:
 *     summary: Update a movie by id
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: Returns a movie updated.
 *       '404':
 *         description: Movie not found.
 *       '500':
 *         description: Error while updating movie.
 */
router.get('/movies', movieController.listMovies.bind(movieController))
router.get('/movies/:id', movieController.getMovieById.bind(movieController))
router.post(
  '/movies',
  movieMiddleware,
  movieController.createMovie.bind(movieController),
)
router.delete('/movies/:id', movieController.deleteMovie.bind(movieController))
router.put(
  '/movies/:id',
  movieMiddleware,
  movieController.updateMovie.bind(movieController),
)
export default router
