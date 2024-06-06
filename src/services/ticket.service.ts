import { ITicket } from '../interfaces/ticket.interface'
import {ITicketRepository} from '../repositories.interfaces/ticket.repository.interface'
import createError from 'http-errors'
import { inject, injectable } from 'tsyringe'

@injectable()
class TicketService {
  constructor(
    @inject('TicketRepository')
    private ticketRepository: ITicketRepository,
  ) {}

  async createTicket(ticketData : any): Promise<ITicket> {
    const existingTicket = await this.ticketRepository.findSessionsChair(ticketData.session_id, ticketData.chair)
    if (existingTicket) {
      throw new createError.Conflict('Chair already taken in this session')
    }
    console.log("ticketData", ticketData)
    return await this.ticketRepository.createTicket(ticketData)
}
}
export default TicketService
