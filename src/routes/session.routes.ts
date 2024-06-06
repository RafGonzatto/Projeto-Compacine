import SessionController from 'controllers/Session.controller'
import { Router } from 'express'
import { sessionMiddleware } from 'middlewares/session.middleware'

const router = Router()
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
router.post('/movies/:movie_id/sessions', sessionMiddleware, SessionController.create)
router.put('/movies/:movie_id/sessions/:id', sessionMiddleware, SessionController.update)
router.delete('/movies/:movie_id/sessions/:id', sessionMiddleware, SessionController.delete)

export default router
