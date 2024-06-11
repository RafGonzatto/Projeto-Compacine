import { DeleteResult } from 'typeorm'
import { ITicket } from '../interfaces/ticket.interface'
import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'
import { ISessionRepository } from '../repositories.interfaces/session.repository.interface';
import createError from 'http-errors'
import { inject, injectable } from 'tsyringe'
import { Ticket } from '../entitys/ticket.entity'

@injectable()
class TicketService {
  constructor(
    @inject('TicketRepository')
    private ticketRepository: ITicketRepository,
     @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async createTicket(ticketData: {
    movie_id: number
    session_id: number
    chair: string
    value: number
  }): Promise<ITicket> {
    const session = await this.sessionRepository.findById(ticketData.session_id)
    if (!session) {
      throw new createError.NotFound('Session not found')
    }

    const existingTicket = await this.ticketRepository.findSessionsChair(
      ticketData.session_id,
      ticketData.chair, 0
    )
    if (existingTicket) {
      throw new createError.Conflict('Chair already taken in this session')
    }
    return await this.ticketRepository.createTicket(ticketData)
  }

  async updateTicket(ticketData: {
    id: number
    session_id: number
    chair: string
    value: number
  }): Promise<Ticket> {
    const session = await this.sessionRepository.findById(ticketData.session_id)
    if (!session) {
      throw new createError.NotFound('Session not found')
    }
    const ticket = await this.ticketRepository.findById(ticketData.id)
    if (!ticket) {
      throw new createError.NotFound('Ticket not found')
    }
    const existingTicket = await this.ticketRepository.findSessionsChair(ticketData.session_id, ticketData.chair, ticketData.id)
    if (existingTicket) {
      throw new createError.Conflict('Chair already taken in this session')
    }
    const updatedTicket = new Ticket()
    updatedTicket.id = ticketData.id
    updatedTicket.chair = ticketData.chair
    updatedTicket.value = ticketData.value
    updatedTicket.session_id = ticketData.session_id
    return await this.ticketRepository.saveTicket(updatedTicket)
  }

  async deleteTicket(ticketData: { id: number; session_id: number }) {
    const result = await this.ticketRepository.deleteTicket(ticketData)
    if (result.affected === 0) {
      throw new createError.NotFound(
        'Ticket not found with this id and session',
      )
    }
  }
}
export default TicketService
