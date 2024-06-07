import { DeleteResult } from 'typeorm'
import { ITicket } from '../interfaces/ticket.interface'
import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'
//import { ISessionRepository } from '../repositories.interfaces/session.repository.interface';
import createError from 'http-errors'
import { inject, injectable } from 'tsyringe'
import { Ticket } from 'models/ticket.model'

@injectable()
class TicketService {
  constructor(
    @inject('TicketRepository')
    private ticketRepository: ITicketRepository,
    //  @inject('SessionRepository')
    // private sessionRepository: ISessionRepository,
  ) {}

  async createTicket(ticketData: {
    movie_id: number
    session_id: number
    chair: string
    value: number
  }): Promise<ITicket> {
    // const session = await this.sessionRepository.findById(ticketData.session_id)
    // if (!session) {
    //   throw new createError.NotFound('Session not found')
    // }

    const existingTicket = await this.ticketRepository.findSessionsChair(
      ticketData.session_id,
      ticketData.chair,
    )
    if (existingTicket) {
      throw new createError.Conflict('Chair already taken in this session')
    }
    return await this.ticketRepository.createTicket(ticketData)
  }

  async updateTicket(data: {
    id: number
    session_id: number
    chair?: string
    value?: number
  }): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(data.id)
    if (!ticket) {
      throw new Error('Ticket not found')
    }

    if (data.chair && data.chair !== ticket.chair) {
      const existingTicket = await this.ticketRepository.findSessionsChair(
        data.session_id,
        data.chair,
      )
      if (existingTicket) {
        throw new Error('Chair already taken in this session')
      }
      ticket.chair = data.chair
    }

    if (data.value !== undefined) {
      ticket.value = data.value
    }

    ticket.session_id = data.session_id

    return await this.ticketRepository.updateTicket(ticket)
  }

  async deleteTicket(ticketData: { id: number; session_id: number }) {
    const result = await this.ticketRepository.deleteTicket(ticketData)
    if (result.affected === 0) {
      throw new createError.NotFound(
        'Ticket Ticket not found with this id and session',
      )
    }
  }
}
export default TicketService
