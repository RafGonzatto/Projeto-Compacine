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
        value: parseInt(value),
      }
      const service = container.resolve(TicketService)
      const tickets = await service.createTicket(ticketData)
      return res.status(200).json(tickets)
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        console.error('Error handling creation of ticket:', error)
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }
  async deleteTicket(req: Request, res: Response) {
    try {
      const { session_id, id } = req.params

      const ticketData = {
        id: parseInt(id),
        session_id: parseInt(session_id),
      }
      const service = container.resolve(TicketService)
      await service.deleteTicket(ticketData)
      return res.status(200).json({ message: 'Ticket deleted successfully' })
    } catch (error: any) {
      if (error && error.status) {
        return res
          .status(error.status)
          .json({ code: error.status, message: error.message })
      } else {
        console.error('Error handling deletion of ticket:', error)
        return res
          .status(500)
          .json({ code: 500, error: error.message.toString() })
      }
    }
  }
}

export default TicketController
