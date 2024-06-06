import { ITicket } from '../interfaces/ticket.interface'
import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'
//import { ISessionRepository } from '../repositories.interfaces/session.repository.interface';
import createError from 'http-errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class TicketService {
  constructor(
    @inject('TicketRepository')
    private ticketRepository: ITicketRepository,
    //  @inject('SessionRepository')
    // private sessionRepository: ISessionRepository,
  ) {}

  async createTicket(ticketData: any): Promise<ITicket> {
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
    console.log('ticketData', ticketData)
    return await this.ticketRepository.createTicket(ticketData)
  }
}
export default TicketService
