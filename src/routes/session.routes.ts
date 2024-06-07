import SessionController from 'controllers/Session.controller'
import { Router } from 'express'
import { sessionMiddleware } from 'middlewares/session.middleware'
import { container } from 'tsyringe'

const router = Router()
const sessionController = container.resolve(SessionController)
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
router.post(
  '/movies/:movie_id/sessions',
  sessionMiddleware,
  sessionController.create,
)
router.put(
  '/movies/:movie_id/sessions/:id',
  sessionMiddleware,
  sessionController.update,
)
router.delete('/movies/:movie_id/sessions/:id', sessionController.delete)

export default router
