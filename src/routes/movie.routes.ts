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
 */
router.get('/movies', movieController.listMovies.bind(movieController))

export default router
