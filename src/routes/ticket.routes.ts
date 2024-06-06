import { Router } from 'express'
import { container } from 'tsyringe'
import TicketController from '../controllers/ticket.controller'
import { ticketMiddleware } from '../middlewares/ticket.middleware'

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
 *         description: Paciente atualizado com sucesso
 *       '400':
 *         description: O nome e a espécie do paciente são obrigatórios
 *       '404':
 *         description: Paciente ou tutor não encontrado
 *       '422':
 *         description: Formato de data inválido
 *       '500':
 *         description: Erro ao atualizar paciente
 */

router.post('/movies/:movie_id/sessions/:session_id/tickets', ticketMiddleware, ticketController.createTicket.bind(ticketController))

export default router
