import { Request, Response } from 'express'
import TicketService from '../services/ticket.service'
import { container } from 'tsyringe'

class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
    const { movie_id, session_id } = req.params
    const { chair, value } = req.body

    const ticketData = {
        movie_id: parseInt(movie_id),
        session_id: parseInt(session_id),
        chair,
        value: parseInt(value)
      }
      const service = container.resolve(TicketService)
      const tickets = await service.createTicket(ticketData)
      return res.status(200).json(tickets)
    } catch (error) {
      console.error('Error while listing tickets:', error)
      return res.status(500).json({ error: 'Error while listing tickets' })
    }
  }
}

export default TicketController
