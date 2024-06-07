import { Router } from 'express'
import { container } from 'tsyringe'
import TicketController from '../controllers/ticket.controller'
import {
  createTicketMiddleware,
  updateTicketMiddleware,
} from '../middlewares/ticket.middleware'

const router = Router()
const ticketController = container.resolve(TicketController)
/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Endpoints related to tickets
 */

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets:
 *   post:
 *     summary: Creates a new ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie's Id
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sesion's Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: integer
 *                 example: 1
 *               chair:
 *                 type: string
 *                 example: "b1"
 *               value:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       '200':
 *         description: Ticket created with success
 *       '400':
 *         description: Bad request, the request body is invalid
 *       '404':
 *         description: Session not found
 *       '409':
 *         description: Chair already taken in this session
 */

router.post(
  '/movies/:movie_id/sessions/:session_id/tickets',
  createTicketMiddleware,
  ticketController.createTicket.bind(ticketController),
)
/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie's Id
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Session's id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket's id
 *     responses:
 *       '200':
 *         description: Ticket deleted with success
 *       '404':
 *         description: Ticket not found with this id and session
 *       '500':
 *         description: Error while deleting ticket
 */
router.delete(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  ticketController.deleteTicket.bind(ticketController),
)

/**
 * @swagger
 * /api/v1/movies/{movie_id}/sessions/{session_id}/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie's Id
 *       - in: path
 *         name: session_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Session's id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chair:
 *                 type: string
 *                 example: "b1"
 *               value:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       '200':
 *         description: Ticket updated with success
 *       '400':
 *         description: Bad request, the request body is invalid, or the parameters in the URL are invalid
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: Error while updating ticket
 */
router.put(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  updateTicketMiddleware,
  ticketController.updateTicket.bind(ticketController),
)
export default router
