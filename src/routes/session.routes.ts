import { Router } from 'express'
import { sessionMiddleware } from '../middlewares/session.middleware'
import SessionController from '../controllers/Session.controller'
import { container } from 'tsyringe'

const router = Router()
const sessionController = container.resolve(SessionController)

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Endpoints related to sessions
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
 *       '200':
 *         description: Session was successfully created.
 *       '400':
 *         description: Bad request, the request body is invalid.
 *       '404':
 *         description: Movie not found.
 *       '500':
 *         description: Error while creating the session.
 */
router.post(
  '/movies/:movie_id/sessions',
  sessionMiddleware,
  sessionController.create.bind(SessionController),
)
/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{id}:
 *   put:
 *     summary: Edit a session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the session
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
 *                 example: "07/06/2024"
 *               time:
 *                 type: string
 *                 example: "20:00:00"
 *     responses:
 *       '200':
 *         description: Returns the session body.
 *       '400':
 *         description: Invalid request body.
 *       '404':
 *         description: Movie or session not found.
 *       '500':
 *         description: Error while updating the session.
 */

router.put(
  '/movies/:movie_id/sessions/:id',
  sessionMiddleware,
  sessionController.update.bind(SessionController),
)

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{id}:
 *   delete:
 *     summary: Delete session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the session
 *     responses:
 *       '200':
 *         description: Session deleted successfully.
 *       '404':
 *         description: Movie or session not found.
 *       '500':
 *         description: Error while deleting the session.
 */
router.delete(
  '/movies/:movie_id/sessions/:id',
  sessionController.delete.bind(sessionController),
)

router.put(
  '/movies/:movie_id/sessions/:id',
  sessionMiddleware,
  sessionController.update.bind(SessionController),
)

router.delete(
  '/movies/:movie_id/sessions/:id',
  sessionController.delete.bind(SessionController),
)

export default router
