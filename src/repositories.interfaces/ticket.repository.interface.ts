import { Ticket } from '../models/ticket.model'
import { ITicket } from '../interfaces/ticket.interface'
import { DeleteResult } from 'typeorm'

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
type DeleteTicketRequest = {
  id: number
  session_id: number
}
export interface ITicketRepository {
  findById(id: number): Promise<Ticket | null>
  findSessionsChair(session_id: number, chair: string): Promise<Ticket | null>
  createTicket(data: CreateTicketRequest): Promise<ITicket>
  updateTicket(data: UpdateTicketRequest): Promise<Ticket>
  deleteTicket(data: DeleteTicketRequest): Promise<DeleteResult>
  saveTicket(ticket: Ticket): Promise<Ticket>
}
