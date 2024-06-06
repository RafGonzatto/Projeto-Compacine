import AppDataSource from '../database/connection'
import { Ticket } from '../models/ticket.model'
import { ITicketRepository } from '../repositories.interfaces/ticket.repository.interface'
import { Repository } from 'typeorm'

class TicketRepository implements ITicketRepository {
  private repository: Repository<Ticket>

  constructor() {
    this.repository = AppDataSource.getRepository(Ticket)
  }

  async findById(id: number) {
    const ticket = await this.repository.findOne({ where: { id: id } })
    return ticket
  }
  async findSessionsChair(session_id: number, chair: string) {
    const sessionsChair = await this.repository.findOne({
      where: { session_id: session_id, chair: chair },
    })
    return sessionsChair
  }

  async createTicket(ticketData: {
    chair: string
    value: number
    session_id: number
  }) {
    const { chair, value, session_id } = ticketData
    const ticket = this.repository.create({
      chair: chair,
      value: value,
      session_id: session_id,
    })

    return this.saveTicket(ticket)
  }

  async updateTicket(data: { id: number; chair?: string; value?: number }) {
    const { id, chair, value } = data
    const ticket = await this.repository.findOne({ where: { id } })

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    if (chair) {
      const existingTicket = await this.repository.findOne({
        where: { session_id: ticket.session_id, chair },
      })
      if (existingTicket && existingTicket.id !== id) {
        throw new Error('Chair already taken in this session')
      }
      ticket.chair = chair
    }

    if (value !== undefined) {
      ticket.value = value
    }
    return this.saveTicket(ticket)
  }

  async deleteTicket(ticketData: { id: number; session_id: number }) {
    return await this.repository.delete({
      id: ticketData.id,
      session_id: ticketData.session_id,
    })
  }

  async saveTicket(ticket: Ticket) {
    return await this.repository.save(ticket)
  }
}

export default TicketRepository
