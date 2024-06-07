import { Router } from 'express'
import { sessionMiddleware } from '../middlewares/session.middleware'
import SessionController from '../controllers/Session.controller'
import { container } from 'tsyringe'

const router = Router()
const sessionController = container.resolve(SessionController)
/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Endpoints related to sessions
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *                 example: "room 1"
 *               capacity:
 *                 type: integer
 *                 example: 150
 *               day:
 *                 type: string
 *                 example: "23/10/2024"
 *               time:
 *                 type: string
 *                 example: "19:20:00"
 *     responses:
 *       200:
 *         description: Session was successfully created.
 *       400:
 *         description: Bad request, the request body is invalid.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Error while creating the session.
 */
router.post(
  '/movies/:movie_id/sessions',
  sessionMiddleware,
  sessionController.create.bind(SessionController),
)
// router.put(
//   '/movies/:movie_id/sessions/:id',
//   sessionMiddleware,
//   SessionController.update,
// )
// router.delete('/movies/:movie_id/sessions/:id', SessionController.delete)

export default router
