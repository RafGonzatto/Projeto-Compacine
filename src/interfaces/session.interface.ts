import { Ticket } from "entitys/ticket.entity"

export interface ISession {
  id: number
  movie_id: number
  room: string
  capacity: number
  day: string
  time: string
  tickets?: Ticket[]
}
