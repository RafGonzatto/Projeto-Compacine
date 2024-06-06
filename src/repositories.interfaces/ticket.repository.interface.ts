import { Ticket } from 'models/ticket.model'

type CreateTicketRequest = {
  chair: string
  value: number
  session_id: number
}

type UpdateTicketRequest = {
  id: number
  chair?: string
  value?: number
}

export interface ITicketRepository {
  findById(id: number): Promise<Ticket | null>
  createTicket(data: CreateTicketRequest): Promise<Ticket>
  updateTicket(data: UpdateTicketRequest): Promise<Ticket>
  deleteTicket(id: number): Promise<void>
  saveTicket(ticket: Ticket): Promise<Ticket>
}
