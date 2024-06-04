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
 */
router.get('/movies', movieController.listMovies.bind(movieController))
router.get('/movies/:id', movieController.getMovieById.bind(movieController))

export default router
